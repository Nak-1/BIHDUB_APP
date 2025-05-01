"use client";

import ItemCard from "@/components/ItemCard";
import { useEffect, useState } from "react";
import "../../styles/Search.css";

export default function SearchPage() {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const auctionsResponse = await fetch('/api/bids');
        if (!auctionsResponse.ok) throw new Error('Failed to fetch auctions');
        const auctionsData = await auctionsResponse.json();
        
        const categoriesResponse = await fetch('/api/categories');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        
        setAuctions(auctionsData.auctions);
        setFilteredAuctions(auctionsData.auctions);
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  useEffect(() => {
    if (!auctions.length) return;
    
    let results = [...auctions];
    
    if (searchTerm) {
      results = results.filter(auction => 
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (auction.description && auction.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory) {
      results = results.filter(auction => auction.category === selectedCategory);
    }
    
    if (priceRange.min) {
      results = results.filter(auction => auction.price >= Number(priceRange.min));
    }
    
    if (priceRange.max) {
      results = results.filter(auction => auction.price <= Number(priceRange.max));
    }
    
    switch (sortBy) {
      case "priceAsc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        results.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        break;
      case "endingSoon":
        results.sort((a, b) => a.timeLeft.localeCompare(b.timeLeft));
        break;
      default:
        break;
    }
    
    setFilteredAuctions(results);
  }, [auctions, searchTerm, selectedCategory, priceRange, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    setSortBy("newest");
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <main>
      <section className="search-header">
        <h1>Дуудлага худалдаа хайх</h1>
      </section>
      
      <section className="search-container">
        <div className="mobile-search-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Хайх..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </div>
          <button className="filter-toggle-btn" onClick={toggleFilters}>
            {showFilters ? "Шүүлтүүр хаах" : "Шүүлтүүр харуулах"}
          </button>
        </div>
        
        <div className={`search-filters ${showFilters ? 'show' : ''}`}>
          <div className="filter-section">
            <h3>Шүүлтүүр</h3>
            
            <div className="filter-group">
              <label htmlFor="category">Ангилал</label>
              <select 
                id="category" 
                value={selectedCategory} 
                onChange={handleCategoryChange}
              >
                <option value="">Бүгд</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id || category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Үнийн хязгаар</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Доод"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Дээд"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            
            <div className="filter-group">
              <label htmlFor="sortBy">Эрэмбэлэх</label>
              <select 
                id="sortBy" 
                value={sortBy} 
                onChange={handleSortChange}
              >
                <option value="newest">Шинэ эхэндээ</option>
                <option value="priceAsc">Үнэ ⬆</option>
                <option value="priceDesc">Үнэ ⬇</option>
                <option value="endingSoon">Дуусах дөхсөн</option>
              </select>
            </div>
            
            <button className="clear-filters" onClick={clearFilters}>
              Шүүлтүүр цэвэрлэх
            </button>
          </div>
        </div>
        
        <div className="search-results">
          <div className="results-header">
            <h3>Хайлтын үр дүн</h3>
            <span className="results-count">{filteredAuctions.length} зүйл олдлоо</span>
          </div>
          
          <div className="results-grid">
            {loading ? (
              <div className="loading">Ачааллаж байна...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : filteredAuctions.length > 0 ? (
              filteredAuctions.map((auction, index) => (
                <ItemCard item={auction} key={index} />
              ))
            ) : (
              <div className="no-results">
                <p>Хайлтад тохирох үр дүн олдсонгүй.</p>
                <p>Өөр түлхүүр үг ашиглан дахин хайна уу.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
