const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const Voter = require('../models/Voter');
const { getVoters, addVoter, updateVoter, deleteVoter } = require('../controllers/voterController');

const { expect } = chai;

// Helper to mock Express response
const mockResponse = () => ({
  status: sinon.stub().returnsThis(),
  json: sinon.spy()
});

describe('Voter Controller Tests', () => {

  afterEach(() => {
    sinon.restore();
  });

  // ------------------- getVoters -------------------
  describe('getVoters', () => {
    it('should return all voters for admin', async () => {
      const req = { user: { role: 'admin' } };
      const res = mockResponse();
      const mockVoters = [{ name: 'A' }, { name: 'B' }];

      sinon.stub(Voter, 'find').returns({ sort: sinon.stub().resolves(mockVoters) });

      await getVoters(req, res);

      expect(res.json.calledWith(mockVoters)).to.be.true;
    });

    it('should return only own voters for regular user', async () => {
      const req = { user: { role: 'voter', id: '123' } };
      const res = mockResponse();
      const mockVoters = [{ name: 'My Voter' }];

      const sortStub = sinon.stub().resolves(mockVoters);
      const findStub = sinon.stub(Voter, 'find').returns({ sort: sortStub });

      await getVoters(req, res);

      expect(findStub.calledWith({ userId: '123' })).to.be.true;
      expect(res.json.calledWith(mockVoters)).to.be.true;
    });

    it('should return 500 on error', async () => {
      const req = { user: {} };
      const res = mockResponse();

      sinon.stub(Voter, 'find').throws(new Error('DB Error'));

      await getVoters(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });

  // ------------------- addVoter -------------------
  describe('addVoter', () => {
    it('should add a new voter successfully', async () => {
      const req = {
        user: { id: '123' },
        body: { name: 'John', email: 'john@example.com', address: '123 Street', dob: '2000-01-01' }
      };
      const res = mockResponse();

      sinon.stub(Voter, 'create').resolves({ ...req.body, userId: '123' });

      await addVoter(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWithMatch({ name: 'John' })).to.be.true;
    });

    it('should return 500 on error', async () => {
      const req = { user: { id: '123' }, body: {} };
      const res = mockResponse();

      sinon.stub(Voter, 'create').throws(new Error('DB Error'));

      await addVoter(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
    });
  });

  // ------------------- updateVoter -------------------
  describe('updateVoter', () => {
    it('should update voter successfully by owner', async () => {
      const voterId = new mongoose.Types.ObjectId();
      const req = {
        user: { role: 'voter', id: '123' },
        params: { id: voterId },
        body: { name: 'Updated Name' }
      };
      const res = mockResponse();

      const mockVoter = {
        _id: voterId,
        userId: '123',
        name: 'Old Name',
        save: sinon.stub().resolvesThis()
      };

      sinon.stub(Voter, 'findById').resolves(mockVoter);

      await updateVoter(req, res);

      expect(mockVoter.name).to.equal('Updated Name');
      expect(res.json.calledWith(mockVoter)).to.be.true;
    });

    it('should return 404 if voter not found', async () => {
      const req = { params: { id: '1' }, user: {} };
      const res = mockResponse();

      sinon.stub(Voter, 'findById').resolves(null);

      await updateVoter(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Voter not found' })).to.be.true;
    });

    it('should return 403 if non-admin tries to update others', async () => {
      const req = { user: { role: 'voter', id: '123' }, params: { id: '1' }, body: {} };
      const res = mockResponse();

      const mockVoter = { _id: '1', userId: '999', save: sinon.stub() };
      sinon.stub(Voter, 'findById').resolves(mockVoter);

      await updateVoter(req, res);

      expect(res.status.calledWith(403)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Forbidden: cannot update other users' })).to.be.true;
    });
  });

  // ------------------- deleteVoter -------------------
  describe('deleteVoter', () => {
    it('should delete voter successfully by admin', async () => {
      const req = { user: { role: 'admin' }, params: { id: '1' } };
      const res = mockResponse();

      const mockVoter = { remove: sinon.stub().resolves() };
      sinon.stub(Voter, 'findById').resolves(mockVoter);

      await deleteVoter(req, res);

      expect(mockVoter.remove.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: 'Voter deleted' })).to.be.true;
    });

    it('should return 403 if non-admin tries to delete', async () => {
      const req = { user: { role: 'voter' }, params: { id: '1' } };
      const res = mockResponse();

      const mockVoter = { remove: sinon.stub(), userId: '123' };
      sinon.stub(Voter, 'findById').resolves(mockVoter);

      await deleteVoter(req, res);

      expect(res.status.calledWith(403)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Forbidden: only admins can delete' })).to.be.true;
    });

    it('should return 404 if voter not found', async () => {
      const req = { user: { role: 'admin' }, params: { id: '1' } };
      const res = mockResponse();

      sinon.stub(Voter, 'findById').resolves(null);

      await deleteVoter(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Voter not found' })).to.be.true;
    });
  });

});
