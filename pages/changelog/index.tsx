import path from 'path'
import fs from 'fs'

const Changelog = () => {}

const getPaths = (path) =>
	fs
		.readdirSync(path)
		// Only include md(x) files
		.filter((path) => {
			return /\.mdx?$/.test(path) || /\.md?$/.test(path)
		})

export const CHANGELOG_PATH = path.join(process.cwd(), 'content/changelog')
export const postFilePaths = getPaths(CHANGELOG_PATH)
// postFilePaths is the list of all mdx files inside the POSTS_PATH directory

export function getStaticProps() {
	// const posts = postFilePaths
	// 	.map((filePath) => {
	// 		const source = fs.readFileSync(path.join(CHANGELOG_PATH, filePath))
	// 		const { content, data } = matter(source)
	// 		data.date = formatDate(data.date)
	// 		return {
	// 			content,
	// 			data,
	// 			filePath,
	// 			slug: filePath.replace(/\.mdx?$/, ''),
	// 		}
	// 	})
	// 	.filter((postItem) => postItem.data.published === true)
	// 	.reverse()
	// const rss = generateRss(posts)
	// fs.writeFileSync('./public/rss.xml', rss)
	// const postSitemap = generatePostsSitemap(posts)
	// fs.writeFileSync('./public/sitemap-posts.xml', postSitemap, 'utf8')
	// return { props: { posts } }
}

export default Changelog
