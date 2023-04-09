const clientId='c2aacf18e8a944ce8ae2f7c117071f05';
const clientSecret='936693c2d46b4fd4bd70b049dea98a3c';

const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });
  
    const data = await result.json();
    return data.access_token;
  };

  const getGenres = async (token) => {
    const limit = 5;
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.categories.items;
  };

  const getPlaylistsByGenre = async(token,genreId)=>{
    const limit = 5;
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token }
      }
    );

    const data = await result.json();
    return data.playlists.items;
    
  };


const getPlaylistTracks= async (token, playlistId) => {
    const limit = 5;
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`,
      {
        method: "GET",
        headers: { 
          Authorization: "Bearer " + token },
      },
    );
  
    const data = await result.json();
    return data;
  };

  const load = async()=>{
    const token = await getToken();
    const genres = await getGenres(token);

    const list = document.getElementById('genres');
    genres.map( async ({id,name,href,icons:[icon]})=>{
        const playlists = await getPlaylistsByGenre(token,id);

        const html = `
          <article class="genre-card">      
            <img src="${icon.url}" width="${icon.width}" height="${icon.height}" class="rounded-img" alt="${name}"/>
            <div>
              <h2>${name}</h2>
              <ol>
                ${await Promise.all(playlists.map(async ({name, images:[image], external_urls:{spotify}, id}) => {
                  const tracks = await getPlaylistTracks(token, id);
                  return `
                    <li>
                      <a href="${spotify}" target="_blank">
                        <img src="${image.url}" width="180" height="180" class="rounded-img" alt="${name}"/>
                      </a>
                      <ul>
                        ${tracks.items.map(({track:{name, external_urls:{spotify}}}) => `
                          <li class="track-name"><a href="${spotify}" target="_blank">${name}</a></li>
                        `).join('')}
                      </ul>
                    </li>
                  `;
                }))}
              </ol>
            </div>
          </article>
        `;
        list.insertAdjacentHTML(`beforeend`,html);
    })
  };

  load();