import { Router } from 'express';

const albums = (params, query) => ({
	query: `
	query Query {
		albums {
			_id
			name {
				th
				en
			}
			description {
				th
				en
			}
			photos {
				url
				is_default_photo
			}
			group {
				code
			}
		}
	}
`,
	variables: { ...params, ...query },
});

const album = (params, query) => ({
	query: `
	query Query($id: String!) {
		album(id: $id) {
			_id
			name {
				th
			}
		}
	}
`,
	variables: { ...params, ...query },
});

const router = Router();
router.get('/albums', async (req, res, next) => {
	try {
		const result = await res.gql.query(albums);
		const { locale, group } = req.query;

		let returnedAlbums = result.data.albums.map(album => {
			const { photos, name, description, ...rest } = album;
			rest.name = name[locale];
			rest.description = description[locale];
			rest.defaultPhoto = photos ? photos.find(photo => photo.is_default_photo) : {};

			return rest;
		});

		if (group) {
			returnedAlbums = returnedAlbums.filter(album => album.group.code === group);
		}

		res.json({ data: returnedAlbums });
	} catch (error) {
		res.json({ error: error.message });
	}
});

router.get('/albums/:id', async (req, res) => {
	try {
		const result = await res.gql.query(album);
		res.json(result.data.album);
	} catch (error) {
		res.json({ error: error.message });
	}
});

export default router;
