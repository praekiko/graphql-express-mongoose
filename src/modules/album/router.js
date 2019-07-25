import { Router } from 'express';

const albums = (params, query) => ({
	query: `
	query Query {
		albums {
			_id
			name {
				th
			}
			description {
				th
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
		res.json({ albums: result.data.albums });
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
