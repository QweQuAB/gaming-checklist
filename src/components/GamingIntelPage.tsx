import React, { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Article, ArticleCategory } from '@/types';
import {
  Bookmark, BookmarkCheck, ExternalLink, Clock, Plus, X,
  Cpu, Building2, Gamepad2, Newspaper, Trash2, AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Filter = 'all' | ArticleCategory | 'bookmarked';

const CAT_META: Record<ArticleCategory, { label: string; icon: React.ComponentType<any>; color: string }> = {
  games:     { label: 'Games',     icon: Gamepad2,  color: '#f59e0b' },
  companies: { label: 'Companies', icon: Building2, color: '#3b82f6' },
  hardware:  { label: 'Hardware',  icon: Cpu,       color: '#10b981' },
};

export function GamingIntelPage() {
  const { articles, toggleBookmark, deleteArticle, addArticle } = useApp();
  const [filter,     setFilter]     = useState<Filter>('all');
  const [isAddOpen,  setIsAddOpen]  = useState(false);
  const [searchText, setSearchText] = useState('');

  const counts = useMemo(() => ({
    all:       articles.length,
    games:     articles.filter(a => a.category === 'games').length,
    companies: articles.filter(a => a.category === 'companies').length,
    hardware:  articles.filter(a => a.category === 'hardware').length,
    bookmarked:articles.filter(a => a.bookmarked).length,
  }), [articles]);

  const visible = useMemo(() => {
    let list = articles;
    if (filter === 'bookmarked') list = list.filter(a => a.bookmarked);
    else if (filter !== 'all')   list = list.filter(a => a.category === filter);
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.source.toLowerCase().includes(q),
      );
    }
    return list;
  }, [articles, filter, searchText]);

  const featured = visible.find(a => a.featured);
  const rest     = visible.filter(a => !a.featured || filter !== 'all' || searchText);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">

      {/* ── Header ── */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-[var(--panel-border)] flex-shrink-0">
        <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
          <div>
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
              <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" style={{ color: 'var(--accent-color)' }} />
              Gaming Intel
            </h2>
            <p className="text-xs sm:text-sm mt-0.5 hidden sm:block" style={{ color: 'var(--text-muted)' }}>
              Articles on games, studios, and hardware — curated for the serious gamer.
            </p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm tracking-wide transition-all hover:opacity-90 active:scale-95 font-heading uppercase rounded flex-shrink-0"
            style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Add Article</span>
          </button>
        </div>

        {/* Filter tabs + search */}
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none flex-1">
            {(['all', 'games', 'companies', 'hardware', 'bookmarked'] as Filter[]).map(f => {
              const active = filter === f;
              const count = counts[f] ?? 0;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 capitalize',
                    active ? '' : 'opacity-50 hover:opacity-80 bg-black/20 border border-[var(--panel-border)]',
                  )}
                  style={active ? { backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' } : {}}
                >
                  {f === 'bookmarked' && <BookmarkCheck className="w-3 h-3" />}
                  {f} {count > 0 && <span className={cn('px-1 py-0.5 rounded text-[9px] font-bold', active ? 'bg-black/20' : 'bg-white/10')}>{count}</span>}
                </button>
              );
            })}
          </div>
          <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search articles..."
            className="w-full sm:w-48 bg-black/20 border border-[var(--panel-border)] px-3 py-1.5 rounded text-xs outline-none focus:border-[var(--accent-color)] transition-colors flex-shrink-0"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
      </header>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-20 md:pb-6">

        {/* Featured hero card */}
        {featured && filter === 'all' && !searchText && (
          <FeaturedCard
            article={featured}
            onBookmark={() => toggleBookmark(featured.id)}
            onDelete={() => deleteArticle(featured.id)}
          />
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {rest.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onBookmark={() => toggleBookmark(article.id)}
                onDelete={() => deleteArticle(article.id)}
              />
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 opacity-40">
            <Newspaper className="w-10 h-10" />
            <p className="font-heading text-sm">No articles found</p>
            {searchText && (
              <button onClick={() => setSearchText('')} className="text-xs underline opacity-70">Clear search</button>
            )}
          </div>
        )}
      </div>

      {isAddOpen && <AddArticleModal onClose={() => setIsAddOpen(false)} onAdd={addArticle} />}
    </div>
  );
}

/* ─── Featured Hero Card ─── */
function FeaturedCard({ article, onBookmark, onDelete }: {
  article: Article;
  onBookmark: () => void;
  onDelete: () => void;
}) {
  const meta = CAT_META[article.category];
  return (
    <div className="relative rounded-xl overflow-hidden mb-5 sm:mb-6 group border border-[var(--panel-border)] hover:border-[var(--accent-color)] transition-colors">
      {/* Cover image */}
      <div className="aspect-video sm:aspect-[21/8] relative overflow-hidden bg-black/40">
        {article.coverUrl
          ? <img src={article.coverUrl} alt={article.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500 group-hover:scale-105 transition-transform duration-700" />
          : <div className="w-full h-full bg-gradient-to-br from-black to-[var(--accent-color)]/20" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-[var(--bg-color)]/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-bold font-heading uppercase tracking-wider" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}>
            Featured
          </span>
          <span className="px-2.5 py-1 rounded text-xs font-bold font-heading uppercase tracking-wider flex items-center gap-1 backdrop-blur bg-black/40 border border-white/10" style={{ color: meta.color }}>
            <meta.icon className="w-3 h-3" /> {meta.label}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button onClick={onBookmark} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors border border-white/10">
            {article.bookmarked
              ? <BookmarkCheck className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
              : <Bookmark className="w-4 h-4 text-white/60" />}
          </button>
          <button onClick={onDelete} className="w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-red-500/80 transition-colors border border-white/10 opacity-0 group-hover:opacity-100">
            <Trash2 className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h3 className="font-heading text-lg sm:text-2xl lg:text-3xl font-bold leading-tight mb-2 max-w-3xl">{article.title}</h3>
          <p className="text-xs sm:text-sm opacity-70 line-clamp-2 sm:line-clamp-3 max-w-2xl leading-relaxed mb-3 hidden sm:block">{article.excerpt}</p>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <span className="text-xs font-bold opacity-60">{article.source}</span>
            <span className="text-xs opacity-40">{article.publishedAt}</span>
            <span className="flex items-center gap-1 text-xs opacity-40">
              <Clock className="w-3 h-3" /> {article.readingTimeMin} min read
            </span>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded font-bold text-xs transition-all hover:opacity-80 active:scale-95 font-heading uppercase"
              style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}
            >
              Read Article <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Article Card ─── */
function ArticleCard({ article, onBookmark, onDelete }: {
  article: Article;
  onBookmark: () => void;
  onDelete: () => void;
}) {
  const meta = CAT_META[article.category];
  return (
    <div className="glass-panel rounded-lg overflow-hidden flex flex-col group border border-[var(--panel-border)] hover:border-[var(--accent-color)]/40 transition-colors">
      {/* Image */}
      <div className="aspect-video relative overflow-hidden bg-black/40 flex-shrink-0">
        {article.coverUrl
          ? <img src={article.coverUrl} alt={article.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
          : <div className="w-full h-full flex items-center justify-center" style={{ background: `radial-gradient(circle at center, ${meta.color}20 0%, transparent 70%)` }}>
              <meta.icon className="w-8 h-8 opacity-20" style={{ color: meta.color }} />
            </div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Category badge */}
        <div
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold font-heading uppercase tracking-wider flex items-center gap-1 bg-black/60 backdrop-blur border"
          style={{ borderColor: `${meta.color}40`, color: meta.color }}
        >
          <meta.icon className="w-2.5 h-2.5" /> {meta.label}
        </div>

        {/* Actions */}
        <div className="absolute top-2 right-2 flex gap-1.5">
          <button
            onClick={onBookmark}
            className="w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/90 transition-colors"
          >
            {article.bookmarked
              ? <BookmarkCheck className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
              : <Bookmark className="w-3.5 h-3.5 text-white/50" />}
          </button>
          <button
            onClick={onDelete}
            className="w-7 h-7 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-3 h-3 text-white/60" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
        <h4 className="font-heading font-bold text-sm sm:text-base leading-snug line-clamp-2">{article.title}</h4>
        <p className="text-xs opacity-55 line-clamp-3 leading-relaxed flex-1">{article.excerpt}</p>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/5 opacity-60 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--panel-border)] mt-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold opacity-50">{article.source}</span>
            <span className="flex items-center gap-0.5 text-[10px] opacity-35">
              <Clock className="w-2.5 h-2.5" /> {article.readingTimeMin}m
            </span>
          </div>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[10px] font-bold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent-color)' }}
          >
            Read <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Add Article Modal ─── */
function AddArticleModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (article: Omit<Article, 'id' | 'bookmarked' | 'featured'>) => void;
}) {
  const [title,          setTitle]          = useState('');
  const [excerpt,        setExcerpt]        = useState('');
  const [category,       setCategory]       = useState<ArticleCategory>('games');
  const [source,         setSource]         = useState('');
  const [sourceUrl,      setSourceUrl]      = useState('');
  const [coverUrl,       setCoverUrl]       = useState('');
  const [tags,           setTags]           = useState('');
  const [readingTimeMin, setReadingTimeMin] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !sourceUrl.trim()) return;
    onAdd({
      title:          title.trim(),
      excerpt:        excerpt.trim(),
      category,
      source:         source.trim() || new URL(sourceUrl).hostname.replace('www.', ''),
      sourceUrl:      sourceUrl.trim(),
      coverUrl:       coverUrl.trim(),
      publishedAt:    new Date().toISOString().slice(0, 10),
      tags:           tags.split(',').map(t => t.trim()).filter(Boolean),
      readingTimeMin: readingTimeMin || 5,
    });
    onClose();
  };

  const inputCls = 'w-full bg-black/20 border border-[var(--panel-border)] p-2.5 rounded text-sm text-[var(--text-color)] outline-none focus:border-[var(--accent-color)] transition-colors';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div
        className="glass-panel w-full sm:max-w-lg rounded-t-2xl sm:rounded-xl overflow-hidden max-h-[92dvh] flex flex-col"
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        <div className="p-4 sm:p-5 border-b border-[var(--panel-border)] flex items-center justify-between flex-shrink-0">
          <h2 className="font-heading text-base sm:text-lg font-bold">Add Article</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="add-article-form" onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3 overflow-y-auto flex-1">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold mb-1 opacity-60">Article Title *</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} className={inputCls} placeholder="e.g. RTX 5090 Review: Worth the Upgrade?" />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold mb-1 opacity-60">Summary / Excerpt</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="Short description of what the article covers..." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold mb-1 opacity-60">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as ArticleCategory)} className={`${inputCls} appearance-none cursor-pointer`} style={{ background: 'rgba(0,0,0,0.2)' }}>
                <option value="games"     style={{ backgroundColor: 'var(--bg-color)' }}>Games</option>
                <option value="companies" style={{ backgroundColor: 'var(--bg-color)' }}>Companies</option>
                <option value="hardware"  style={{ backgroundColor: 'var(--bg-color)' }}>Hardware</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold mb-1 opacity-60">Read Time (min)</label>
              <input type="number" min={1} max={60} value={readingTimeMin} onChange={e => setReadingTimeMin(Number(e.target.value))} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold mb-1 opacity-60">Article URL *</label>
            <input required type="url" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} className={inputCls} placeholder="https://www.ign.com/articles/..." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold mb-1 opacity-60">Source Name</label>
              <input value={source} onChange={e => setSource(e.target.value)} className={inputCls} placeholder="e.g. IGN" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold mb-1 opacity-60">Cover Image URL</label>
              <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} className={inputCls} placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-bold mb-1 opacity-60">Tags (comma-separated)</label>
            <input value={tags} onChange={e => setTags(e.target.value)} className={inputCls} placeholder="e.g. NVIDIA, GPU, RTX 5090" />
          </div>

          <p className="flex items-start gap-1.5 text-xs opacity-40 pt-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            Articles are saved locally in your checklist — they link out to the original source.
          </p>
        </form>

        <div className="p-4 sm:p-5 border-t border-[var(--panel-border)] flex justify-end gap-2 flex-shrink-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 font-bold text-sm rounded hover:bg-white/5 transition-colors font-heading">Cancel</button>
          <button type="submit" form="add-article-form" className="px-6 py-2.5 font-bold text-sm rounded font-heading" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)' }}>
            Save Article
          </button>
        </div>
      </div>
    </div>
  );
}
