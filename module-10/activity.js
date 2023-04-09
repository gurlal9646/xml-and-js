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
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.categories.items;
  };


  const getPlaylistsByGenre = async(token,genreId)=>{
    const limit = 10;
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        limit:10
      }
    );

    const data = await result.json();
    return data.playlists.items;
    
  };

  const load = async()=>{
    const token = await getToken();
    const genres = await getGenres(token);

    const list = document.getElementById('genres');
    genres.map( async ({id,name,href,icons:[icon]})=>{

      const playlists = await getPlaylistsByGenre(token,id).then((data)=>
      data.map(({name,images:[image],external_urls:{spotify}})=>
        `<li>
          <a href="${spotify}" target="_blank" >
              <img src="${image.url}"  width="180" height="180" alt="${name}"/>
          </a>
        </li>`

      ).join('')
      );

        const html= `
        <article class="genre-card">      
          <img src="${icon.url}" width="${icon.width} height="${icon.height}" alt="${name}"/>
         <div>
           <h2>${name}</h2>
           <ol>${playlists}</ol>
         </div>
        </article>
        `;

        list.insertAdjacentHTML(`beforeend`,html);
    })
  };

  load();