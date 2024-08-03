import { OperationLog } from '../modals/todoModals.js';

const getAllOperationLogs = async (req, res) => {
  try {
    const logs = await OperationLog.find({})
      .populate('user', 'username')
      .sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      error: 'Beim Abrufen der Logs ist ein Fehler aufgetreten.',
    });
  }
};

export { getAllOperationLogs };
