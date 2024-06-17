const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require( 'fs' ).promises

// we should search through the directories in examples, and use
// the name from the files to generate the HtmlWebpackPlugin settings.

const CHAPTER_PREFIX = path.join( __dirname, 'samples/chapters/' )

module.exports = async () => {
    const {
        generatedEntries,
        generatedPlugins
    } = await getDirectoryEntries()

    return {
        module: {
            rules: [ {
                test: /\.glsl$/i,
                use: 'raw-loader'
            } ]
        },
        mode: 'development',

        // 입력
        entry: {
            ...generatedEntries,

            'sample-1': {
                import: './samples/sample-1.js'
            },
            'sample-2': {
                import: './samples/sample-2.js'
            },
            'moving-truck': {
                import: './samples/moving-truck.js'
            },
            sample: {
                import: './samples/sample-template.js'
            }
        },
        // 출력
        output: {
            filename: 'js/[name][contenthash:4].js'
        },

        devtool: 'inline-source-map',

        devServer: {
            // static: ['./dist', './assets']
            static: [ 
                {
                    directory: path.join( __dirname, 'assets' ),
                    publicPath: '/assets'
                },
                {
                    directory: path.join( __dirname, 'dist' )
                }
            ]
        },

        plugins: [
            // new CopyWebpackPlugin({
            //   patterns: [{ from: 'assets', to: 'assets' }]
            // }),

            ...generatedPlugins

            // new HtmlWebpackPlugin({
            //   filename: 'truck.html',
            //   template: 'template.html',
            //   chunks: ['moving-truck']
            // }),
            // new HtmlWebpackPlugin({
            //   filename: 'index-1.html',
            //   template: 'template.html',
            //   chunks: ['sample-1']
            // }),
            // new HtmlWebpackPlugin({
            //   filename: 'sample.html',
            //   template: 'template.html',
            //   chunks: ['sample']
            // }),
            // new HtmlWebpackPlugin({
            //   filename: 'index-1.html',
            //   template: 'template.html',
            //   chunks: ['sample-1']
            // }),
            // new HtmlWebpackPlugin({
            //   filename: 'index-2.html',
            //   chunks: ['sample-2'],
            //   template: 'template.html'
            // })
        ],
        
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },
        
        experiments: {
            asyncWebAssembly: true
        }
    }
}

const getDirectoryEntries = async () => {

    const generatedPlugins = []
    const generatedEntries = {}

    const chapters = [
        'chapter-1',
        'chapter-2',
        'chapter-3',
        'chapter-4',
        'chapter-5',
        'chapter-6',
        'chapter-7',
        'chapter-8',
        'chapter-9',
        'chapter-10',
        'chapter-11',
        'chapter-12',
        'chapter-13',
        'chapter-14'
    ]
    for ( const chapter of chapters ) {

        // 각 챕터 디렉토리에 들어있는 항목들 조회
        const entries = await fs.readdir( CHAPTER_PREFIX + chapter, {
            withFileTypes: true
        } )

        // 자바스크립트 파일들만 분리
        const candidates = entries.filter( ( entry ) => entry.name.endsWith( '.js' ) )

        for ( const candidate of candidates ) {

            // 자바스크립트 파일들에 대한 HTML 파일생성 플러그인을 생성
            const name = path.parse( candidate.name ).name
            const plugin = new HtmlWebpackPlugin( {
                filename: chapter + '/' + name + '.html',
                chunks: [ name ],
                template: 'template.html'
            } )

            // 자바스크립트 파일들에 대한 entry 항목 생성
            generatedEntries[ name ] = {
                import: CHAPTER_PREFIX + chapter + '/' + candidate.name
            }

            // 플러그인 목록에 추가
            generatedPlugins.push( plugin )
        }
    }

    return {
        generatedEntries,
        generatedPlugins
    }
}
