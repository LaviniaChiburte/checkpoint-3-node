module.exports = function(sequelize, DataTypes) {
  const playlist = sequelize.define(
    "Playlist",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "Playlists",
      timestamps: false
    }
  );
  playlist.associate = function(models) {
    playlist.hasMany(models.Track, { foreignKey: "id_playlist", as: "track" });
  };

  return playlist;
};
