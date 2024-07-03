const fs = require("fs-extra");
const path = require("path");
const { MediaModel } = require("../models/media.models");

exports.delete_media = async (req, res) => {
  try {
    const { slug } = req.params;
    const media = await MediaModel.findOne({ slug });

    const mediaPath = path.join(
      global.dirPublic,
      media?.fileId,
      media?.file_name
    );

    if (!fs.existsSync(mediaPath)) throw new Error("media not found!");

    fs.rmSync(mediaPath);

    const mediaDelete = await MediaModel.deleteOne({
      slug,
    });
    if (!mediaDelete?.deletedCount) throw new Error("Media Delete failed!");

    return res.status(200).json({ msg: "deleted!", slug });
  } catch (err) {
    return res.status(err?.code || 500).json({
      error: true,
      msg: err?.message,
    });
  }
};
