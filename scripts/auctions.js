async function loadAuctions() {
    try {
        const response = await fetch('../data/auctions.json');
        const data = await response.json();
        renderAuctions(data.auctions);
    } catch (error) {
        console.error('Error loading auctions:', error);
        document.getElementById('auctionContainer').innerHTML = 
            '<p>Error loading</p>';
    }
}

function renderAuctions(auctions) {
    const auctionContainer = document.getElementById('auctionContainer');
    
    const auctionCards = auctions.map(auction => `
        <div class="auction-card" data-id="${auction.id}">
            <img src="${auction.image}" alt="${auction.title}" class="auction-image">
            <div class="auction-details">
                <h3 class="auction-title">${auction.title}</h3>
                <div class="auction-price">₮ ${auction.price.toLocaleString()}</div>
                <div class="auction-time">Дуусах хугацаа: ${auction.timeLeft}</div>
                <div class="auction-bids">Нийт оролцогч: ${auction.currentBids}</div>
                <button class="bid-button" onclick="placeBid(${auction.id})">Дуудлага өгөх</button>
            </div>
        </div>
    `).join('');

    auctionContainer.innerHTML = auctionCards;
}

window.placeBid = function(auctionId) {
    console.log(`Bid placed for auction ${auctionId}`);
}

document.addEventListener('DOMContentLoaded', loadAuctions);
