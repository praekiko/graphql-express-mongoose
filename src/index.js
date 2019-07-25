import server from './server';
import config from './common/config';

server.listen(config.port, () => {
	console.log('🏠 BaanStory API is running on port', config.port);
});
