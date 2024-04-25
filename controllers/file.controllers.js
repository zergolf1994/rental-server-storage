const fs = require("fs-extra");
const path = require("path");
const { MediaModel } = require("../models/media.models");
const { getLocalServer } = require("../utils/server.utils");

exports.deleteMedia = async (req, res) => {
  try {
    return res.status(200).json({ msg: "deleted!" });
  } catch (err) {
    return res.status(err?.code || 500).json({
      error: true,
      msg: err?.message,
    });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const { fileId } = req.params;
    const folderPath = path.join(global.dirPublic, fileId);
    if (!fs.existsSync(folderPath)) throw new Error("Folder not found!");

    const server = await getLocalServer();
    if (!server) throw new Error("Server not found!");

    fs.rmSync(folderPath, { recursive: true, force: true });
    const mediaDelete = await MediaModel.deleteMany({
      fileId,
      serverId: server?._id,
    });

    if (!mediaDelete?.deletedCount) throw new Error("Media Delete failed!");

    return res
      .status(200)
      .json({ msg: `${mediaDelete?.deletedCount} media deleted!` });
  } catch (err) {
    return res.status(err?.code || 500).json({
      error: true,
      msg: err?.message,
    });
  }
};
