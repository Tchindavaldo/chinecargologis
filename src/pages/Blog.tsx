import { Calendar, Clock, User, ArrowRight, TrendingUp, Search, ChevronRight, Bookmark } from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Blog() {
  const featuredPost = {
    title: 'Guide Complet 2024 : Tout Savoir sur l\'Import-Export Chine-Monde',
    excerpt: 'Découvrez les meilleures pratiques, les réglementations douanières et les conseils d\'experts pour réussir vos importations depuis la Chine vers le reste du monde.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
    category: 'Guides',
    date: '15 Janvier 2024',
    readTime: '8 min',
    author: 'Marie Kouassi',
  };

  const posts = [
    {
      title: 'Fret Maritime vs Fret Aérien : Comment Choisir ?',
      excerpt: 'Analysez les avantages et inconvénients de chaque mode de transport pour optimiser vos coûts et délais.',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=800',
      category: 'Logistique',
      date: '12 Janvier 2024',
      readTime: '5 min',
      author: 'Jean-Pierre Mbeki',
    },
    {
      title: 'Nouveaux Accords Douaniers 2024 : Ce qui Change',
      excerpt: 'Les dernières modifications réglementaires qui impactent vos expéditions internationales.',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800',
      category: 'Réglementation',
      date: '10 Janvier 2024',
      readTime: '6 min',
      author: 'Fatou Diallo',
    },
    {
      title: 'Optimiser les Coûts de Transport : 10 Astuces d\'Experts',
      excerpt: 'Réduisez vos dépenses logistiques grâce à ces stratégies éprouvées par nos experts.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
      category: 'Conseils',
      date: '08 Janvier 2024',
      readTime: '7 min',
      author: 'Pierre Nguema',
    },
    {
      title: 'E-commerce : Gérer la Logistique de Vos Produits Chinois',
      excerpt: 'Solutions adaptées aux boutiques en ligne pour une gestion efficace des stocks et livraisons.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800',
      category: 'E-commerce',
      date: '05 Janvier 2024',
      readTime: '6 min',
      author: 'Aminata Touré',
    },
    {
      title: 'Tendances du Marché Mondial 2024',
      excerpt: 'Analyse des secteurs porteurs et opportunités d\'import-export pour cette année.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
      category: 'Marché',
      date: '03 Janvier 2024',
      readTime: '9 min',
      author: 'Kwame Asante',
    },
    {
      title: 'Comment Éviter les Retards de Livraison ?',
      excerpt: 'Stratégies et bonnes pratiques pour garantir des délais de livraison respectés.',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800',
      category: 'Guides',
      date: '01 Janvier 2024',
      readTime: '5 min',
      author: 'Marie Kouassi',
    },
  ];

  const categories = [
    { name: 'Tous', count: 24 },
    { name: 'Guides', count: 8 },
    { name: 'Logistique', count: 6 },
    { name: 'Réglementation', count: 4 },
    { name: 'E-commerce', count: 3 },
    { name: 'Marché', count: 3 },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)', color: 'var(--text)' }}>
      <SEO 
        title="Blog & Actualités - Chine Cargo Logis | Conseils Logistiques"
        description="Restez informé des dernières actualités logistiques, conseils d'experts et guides pratiques pour réussir vos expéditions internationales."
        keywords="blog logistique, conseils import-export, transport chine, douane, e-commerce"
        canonical="https://chinecargologis.com/blog"
      />
      <Header />

      {/* HERO SECTION */}
      <section className="hero" style={{ minHeight: '55vh' }}>
        <div className="hero-img-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-overlay2"></div>
        
        <div className="hero-content">
          <div className="hero-badge">📰 Actualités & Insights</div>
          <h1 className="animate-fade-in-up">
            Blog <em>Logistique</em>
          </h1>
          <p className="hero-sub animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Guides, conseils et tendances de la logistique internationale pour optimiser vos flux mondiaux.
          </p>
          
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 mt-8">
            <Link to="/" className="hover:text-red-600 transition-colors font-semibold">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-red-500 font-semibold">Blog</span>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-24" style={{ background: 'var(--darker)' }}>
        <div className="container mx-auto px-4">
          <div className="section-tag animate-reveal text-center mb-4">// À la une</div>
          <h2 className="text-gray-900 text-center mb-16 animate-reveal">Article <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>Vedette</em></h2>
          
          <div className="max-w-6xl mx-auto animate-reveal">
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-white border border-gray-100 shadow-2xl overflow-hidden group rounded-2xl">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-red-600 text-white px-4 py-1 font-bold text-xs tracking-widest uppercase">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-14 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-6 text-gray-900 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {featuredPost.title}
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8 font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-red-600" />
                    <span className="text-gray-500">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-red-600" />
                    <span className="text-gray-500">{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-red-600" />
                    <span className="text-gray-500">{featuredPost.readTime}</span>
                  </div>
                </div>
                <button className="btn-primary flex items-center gap-2 w-fit">
                  LIRE L'ARTICLE
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID & SIDEBAR */}
      <section className="py-24" style={{ background: 'var(--dark)' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-8 animate-reveal">
                {/* Search */}
                <div className="bg-white p-6 border border-gray-100 shadow-lg rounded-xl">
                  <h4 className="stat-label text-gray-900 mb-4" style={{ textAlign: 'left' }}>Recherche</h4>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Rechercher..." 
                      className="w-full bg-gray-50 border border-gray-100 px-4 py-3 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium rounded-lg"
                    />
                    <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600" />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white p-6 border border-gray-100 shadow-lg rounded-xl">
                  <h4 className="stat-label text-gray-900 mb-4" style={{ textAlign: 'left' }}>Catégories</h4>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 bg-gray-50 border border-transparent hover:border-red-600/20 hover:bg-red-50 transition-all flex items-center justify-between group rounded-lg"
                      >
                        <span className="font-semibold text-gray-500 group-hover:text-red-600 transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {category.name}
                        </span>
                        <span className="text-xs text-red-600 font-bold bg-red-600/10 px-2 py-1 rounded">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div className="bg-white p-6 border border-gray-100 shadow-lg rounded-xl">
                  <h4 className="stat-label text-gray-900 mb-4" style={{ textAlign: 'left' }}>Tendance</h4>
                  <div className="space-y-6">
                    {[
                      { title: 'Guide des Incoterms 2024', views: '12k' },
                      { title: 'Calculer les frais de douane', views: '9.5k' },
                      { title: 'Choisir son transporteur', views: '8k' }
                    ].map((item, i) => (
                      <div key={i} className="group cursor-default">
                        <p className="font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                          <TrendingUp size={10} className="text-red-600" />
                          <span>{item.views} vues</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-12 animate-reveal">
                <h2 className="text-gray-900 text-2xl">Derniers <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>Articles</em></h2>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  Trier par: 
                  <select className="bg-transparent border-none text-red-600 focus:outline-none cursor-pointer">
                    <option className="bg-white">Plus récents</option>
                    <option className="bg-white">Populaires</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post, index) => (
                  <article 
                    key={index}
                    className="bg-white border border-gray-100 shadow-xl rounded-2xl group animate-reveal overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-red-600 px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-gray-100 rounded">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-900 border border-gray-100 hover:bg-red-600 hover:text-white transition-all rounded shadow-lg">
                          <Bookmark size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-4 text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        {post.title}
                      </h3>
                      <p className="text-gray-500 mb-6 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        <div className="flex items-center gap-2">
                          <User size={12} className="text-red-600" />
                          <span className="text-gray-500">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-red-600" />
                            <span className="text-gray-500">{post.date}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-red-600 font-bold text-xs tracking-widest uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                        LIRE LA SUITE
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-16 animate-reveal">
                <button className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:border-red-600 hover:text-red-600 transition-all font-bold bg-white rounded shadow-sm">1</button>
                <button className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:border-red-600 hover:text-red-600 transition-all font-bold bg-white rounded shadow-sm">2</button>
                <button className="w-10 h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:border-red-600 hover:text-red-600 transition-all font-bold bg-white rounded shadow-sm">3</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter py-24" style={{ background: 'var(--surface)' }}>
        <div className="newsletter-inner">
          <div className="section-tag animate-reveal">// Newsletter</div>
          <h2 className="animate-reveal text-gray-900">Restez <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>Informé</em></h2>
          <p className="animate-reveal text-gray-600">Recevez nos guides, conseils et analyses directement dans votre boîte mail pour optimiser vos flux mondiaux.</p>
          <div className="newsletter-form animate-reveal">
            <input type="email" className="newsletter-input bg-white border-gray-100 text-gray-900" placeholder="votre@email.com" />
            <button className="newsletter-btn">S'ABONNER</button>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-8 animate-reveal">
            Articles exclusifs • Guides pratiques • Pas de spam
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

