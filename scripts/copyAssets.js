const fs = require('fs');

const paths = {
	dist: {
		root: './dist',
		assets: './dist/assets',
	},
	src: {
		imageAssets: './src/assets/img',
		logoAssets: './src/assets/logos',
		jsonAssets: './src/assets/json',
		facesAssets: './src/assets/faces',
	},
};

if (!fs.existsSync(paths.dist.root)) {
	fs.mkdirSync(paths.dist.root);
}

if (!fs.existsSync(paths.dist.assets)) {
	const imageAssets = fs.readdirSync(paths.src.imageAssets);
	const logoAssets = fs.readdirSync(paths.src.logoAssets);
	const jsonAssets = fs.readdirSync(paths.src.jsonAssets);
	const facesAssets = fs.readdirSync(paths.src.facesAssets);

	fs.mkdirSync(paths.dist.assets);

	for (const asset of imageAssets) {
		fs.copyFileSync(`${paths.src.imageAssets}/${asset}`, `${paths.dist.assets}/${asset}`);
	}

	for (const asset of logoAssets) {
		fs.copyFileSync(`${paths.src.logoAssets}/${asset}`, `${paths.dist.assets}/${asset}`);
	}

	for (const asset of jsonAssets) {
		fs.copyFileSync(`${paths.src.jsonAssets}/${asset}`, `${paths.dist.assets}/${asset}`);
	}

	for (const asset of facesAssets) {
		fs.copyFileSync(`${paths.src.facesAssets}/${asset}`, `${paths.dist.assets}/${asset}`);
	}
}
