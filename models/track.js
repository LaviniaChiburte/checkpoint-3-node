"use strict";
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define("Track", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    album_picture: DataTypes.STRING,
    youtube_url: DataTypes.STRING,

    id_playlist: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    }
  });
  track.associate = function(models) {
    track.belongsTo(models.Playlist, {
      foreignKey: "id_playlist",
      as: "playlist"
    });
  };
  return track;
};
