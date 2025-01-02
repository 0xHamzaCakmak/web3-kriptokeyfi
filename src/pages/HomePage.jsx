import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { useYouTube } from '../context/YouTubeContext';
import { useArticles } from '../context/ArticleContext';

const HomePage = () => {
  const { account } = useWeb3();
  const { videos } = useYouTube();
  const { articles } = useArticles();

  // Son 3 video ve makaleyi al
  const latestVideos = videos.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Bölümü */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-12 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kripto Dünyasına Açılan Kapınız!
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Canlı fiyatlar, analizler, makaleler ve Web3 projeleriyle kripto dünyasını keşfedin.
          </p>
          <Link
            to="/wallet"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Hemen Keşfet
          </Link>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          {/* Kripto sembollerinden oluşan arka plan deseni */}
          <div className="text-8xl font-bold">
            ₿ Ξ ◈
          </div>
        </div>
      </section>

      {/* Hizmetler Bölümü */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Uzmanlık Alanlarımız</h2>
          <p className="text-xl text-gray-600">İhtiyacınıza özel Web3 çözümleri</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Web Sitesi Tasarımı',
              icon: '🎨',
              description: 'Modern ve kullanıcı dostu Web3 arayüzleri tasarlıyoruz.',
              link: '/services/web-design',
              color: 'from-pink-500 to-rose-500'
            },
            {
              title: 'Akıllı Sözleşmeler',
              icon: '📝',
              description: 'Güvenli ve verimli akıllı sözleşme geliştirme hizmetleri.',
              link: '/services/smart-contracts',
              color: 'from-purple-500 to-indigo-500'
            },
            {
              title: 'Web3 Projeleri',
              icon: '🌐',
              description: 'DeFi, NFT ve DAO projeleriniz için tam kapsamlı çözümler.',
              link: '/services/web3-projects',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Yazılım Danışmanlığı',
              icon: '💡',
              description: 'Blockchain ve Web3 teknolojileri için uzman danışmanlık.',
              link: '/services/consulting',
              color: 'from-emerald-500 to-teal-500'
            }
          ].map((service) => (
            <div
              key={service.title}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Arkaplan gradient efekti */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* İçerik */}
              <div className="relative z-10">
                <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </span>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 min-h-[60px]">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <span>Detaylı Bilgi Al</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube İçerikleri */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">En Yeni YouTube İçerikleri</h2>
          <Link
            to="/youtube-lessons"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestVideos.map(video => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative pb-[56.25%]">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{video.title}</h3>
                <Link
                  to={`/youtube-lessons/${video.id}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  İzle →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Makaleler */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Son Makaleler</h2>
          <Link
            to="/articles"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Tümünü Gör →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
              <span className="text-indigo-600">Devamını Oku →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Topluluk Katılımı */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 relative overflow-hidden">
        {/* Dekoratif arka plan deseni */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 transform -rotate-45">
            <div className="text-9xl">✍️</div>
          </div>
          <div className="absolute bottom-0 right-0 transform rotate-45">
            <div className="text-9xl">🎥</div>
          </div>
        </div>

        {/* İçerik */}
        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Siz de İçerik Paylaşın!</h2>
            <p className="text-xl opacity-90">
              Kripto dünyasındaki bilgi ve deneyimlerinizi topluluğumuzla paylaşın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Yazarlar İçin */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <div className="text-5xl mb-4">✍️</div>
              <h3 className="text-2xl font-semibold mb-4">Yazarlar İçin</h3>
              <p className="mb-6 opacity-90">
                Kripto para, blockchain teknolojileri ve Web3 dünyası hakkındaki 
                bilgi ve deneyimlerinizi makaleler aracılığıyla paylaşın.
              </p>
              <div className="space-y-4">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                    Özgün içerik oluşturun
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                    Topluluğa değer katın
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                    Okuyucularla etkileşime geçin
                  </li>
                </ul>
                <Link
                  to="/articles/new"
                  className="inline-block w-full text-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Hemen Makale Yaz
                </Link>
              </div>
            </div>

            {/* YouTuberlar İçin */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="text-2xl font-semibold mb-4">YouTuberlar İçin</h3>
              <p className="mb-6 opacity-90">
                Eğitici ve bilgilendirici video içeriklerinizi platformumuzda 
                paylaşarak daha geniş bir kitleye ulaşın.
              </p>
              <div className="space-y-4">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                    Video içeriklerinizi paylaşın
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                    Kanalınızı büyütün
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                    İzleyicilerle etkileşime geçin
                  </li>
                </ul>
                <Link
                  to="/youtube-lessons/new"
                  className="inline-block w-full text-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Hemen Video Ekle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cüzdan Bölümü (Giriş yapılmışsa) */}
      {account && (
        <section className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Merhaba!</h2>
              <p className="text-gray-600">
                Cüzdan Adresiniz: {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </p>
            </div>
            <Link
              to="/wallet"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Cüzdan Detayları
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage; 