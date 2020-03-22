module.exports = (app, models) => {
  //as a user, I want to be able to create a new playlist
  app.post("/playlists/create-playlist", (req, res) => {
    const newPlaylist = {
      title: req.body.title,
      genre: req.body.genre
    };

    models.Playlist.create(newPlaylist)
      .then(playlist =>
        res.json({ playlist, msg: "playlist created successfully" })
      )
      .catch(console.log);
  });

  //as a user, I want to be able to see a playlist by entering its id in the url
  app.get("/playlists/:id", function(req, res) {
    const idPlaylist = req.params.id;
    models.Playlist.findOne({ where: { id: idPlaylist } }).then(playlist =>
      res.json(playlist).catch(console.log)
    );
  });

  //as a user, I want to create and assign a song to a playlist
  app.post("/songs/create-song", (req, res) => {
    models.Track.create({
      title: req.body.title,
      artist: req.body.artist,
      album_picture: req.body.album_picture,
      youtube_url: req.body.youtube_url,
      id_playlist: req.body.id_playlist
    })
      .then(song => res.json(song))
      .catch(console.log);
  });

  //as a user, I want to list all the songs from a playlist
  app.get("/playlists/:id/songs", (req, res) => {
    const playlistId = req.params.id;
    models.Track.findAll({ where: { id_playlist: playlistId } })
      .then(songs => res.json(songs))
      .catch(console.log);
  });

  //as a user, I want to be able to delete a playlist
  app.delete("/playlists/:id", (req, res) => {
    const idPlaylist = req.params.id;
    models.Playlist.destroy({ where: { id: idPlaylist } })
      .then(
        res.json({ msg: `Playlist with the id of ${idPlaylist} was deleted` })
      )
      .catch(console.log);
  });
  //as a user, I want to be able to modify a playlist
  app.put("/playlists/:id", (req, res) => {
    models.Playlist.update(
      {
        title: req.body.title,
        genre: req.body.genre
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(updatedPlaylist =>
        res.json({ updatedPlaylist, msg: "Playlist modified!" })
      )
      .catch(console.log);
  });

  //as a user, I want to delete a song from a playlist

  app.delete("/playlists/:playlistId/songs/:songId", (req, res) => {
    const playlistId = req.params.playlistId;
    const songId = req.params.songId;

    models.Track.findOne({ where: { id: songId } })
      .then(song => {
        if (song === null || song === undefined) {
          res.json({ msg: `No song was found` });
        } else if (song.id_playlist === parseInt(playlistId)) {
          console.log("good");
          models.Track.destroy({
            where: { id: songId }
          }).then(
            res.json({ msg: `The song with the id of ${songId} was deleted` })
          );
        }
      })
      .catch(console.log);
  });

  //as a user, I want to edit a song from a playlist
  app.put("/playlists/:playlistId/songs/:songId", (req, res) => {
    const playlistId = req.params.playlistId;
    const songId = req.params.songId;

    models.Track.findOne({ where: { id: songId } })
      .then(song => {
        if (song === null || song === undefined) {
          res.json({ msg: `No song was found` });
        } else if (song.id_playlist === parseInt(playlistId)) {
          models.Track.update(
            {
              title: req.body.title,
              artist: req.body.artist,
              album_picture: req.body.album_picture,
              youtube_url: req.body.youtube_url
            },
            {
              where: {
                id: songId
              }
            }
          ).then(
            res.json({
              msg: `The song ${req.body.title} was updated`
            })
          );
        }
      })
      .catch(console.log);
  });
};
