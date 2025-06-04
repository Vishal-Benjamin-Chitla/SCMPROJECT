// --- Genre Navigation Logic ---
document.querySelectorAll('.genre-nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.genre-nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    filterEvents(this.dataset.genre);
  });
});

// --- Logo Animation & Auto-Scroll ---
window.addEventListener('DOMContentLoaded', () => {
  const circle = document.querySelector('.logo-anim circle');
  const logoText = document.getElementById('logoText');
  const logoSubtext = document.getElementById('logoSubtext');
  const homeBtn = document.getElementById('homeBtn');
  if (circle) {
    const len = Math.PI * 200; // 2πr, r=100 (for 220px SVG)
    circle.style.strokeDasharray = len;
    circle.style.strokeDashoffset = len;
    circle.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(.4,0,.2,1)';
    setTimeout(() => {
      circle.style.strokeDashoffset = 0;
      // After logo finishes, fade in text and home button
      setTimeout(() => {
        logoText.style.opacity = 1;
        logoText.style.transform = 'translateY(0)';
        logoSubtext.style.opacity = 1;
        logoSubtext.style.transform = 'translateY(0)';
        homeBtn.style.opacity = 1;
        homeBtn.style.transform = 'scale(1)';
        // After text fades in, scroll to events
        setTimeout(() => {
          document.getElementById('events').scrollIntoView({
            behavior: 'smooth'
          });
        }, 800);
      }, 800);
    }, 300);
  }
});

// --- Event Data ---
const events = [
  {
    title: "Music for Meals",
    date: "15 June 2025",
    location: "Phoenix Arena, Bengaluru",
    genre: "music charity",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    desc: "A charity concert supporting local communities. Enjoy live performances and help feed Bengaluru.",
  },
  {
    title: "Startup Connect 2025",
    date: "25 July 2025",
    location: "Tech Park Convention Center",
    genre: "business",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    desc: "Bengaluru’s biggest networking event for entrepreneurs and investors.",
  },
  {
    title: "Art & Culture Fest",
    date: "10 August 2025",
    location: "City Art Gallery",
    genre: "art",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    desc: "Celebrate creativity with workshops, exhibitions, and performances.",
  },
  {
    title: "Code for Change Hackathon",
    date: "2 September 2025",
    location: "BENIK HQ",
    genre: "business charity",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    desc: "48-hour hackathon for social good. Open to developers, designers, and visionaries.",
  },
  {
    title: "Indie Music Night",
    date: "18 June 2025",
    location: "The Warehouse",
    genre: "music",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    desc: "Showcase of Bengaluru’s best indie bands. Dance, chill, and discover new sounds.",
  },
  {
    title: "Art for All",
    date: "5 July 2025",
    location: "Open Park",
    genre: "art charity",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    desc: "Outdoor art fair raising funds for local schools. Free entry.",
  },
  {
    title: "Foodies Carnival",
    date: "22 July 2025",
    location: "Central Grounds",
    genre: "food",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    desc: "A celebration of Bengaluru’s food scene with live music, chef battles, and pop-up stalls.",
  },
  {
    title: "Yoga in the Park",
    date: "1 August 2025",
    location: "Cubbon Park",
    genre: "wellness",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    desc: "Morning yoga sessions with top instructors. All levels welcome. Bring your mat!",
  }
];

// --- Filter Events by Genre ---
function filterEvents(genre = "all") {
  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = '';
  let filtered = genre === "all" ? events : events.filter(ev => ev.genre.includes(genre));
  filtered.forEach((ev, i) => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.setProperty('--delay', ${0.12 * i + 0.25}s);
    card.innerHTML = `
      <div class="event-img-wrap">
        <img src="${ev.img}" alt="${ev.title}" class="event-img">
      </div>
      <div class="event-info">
        <div class="event-title">${ev.title}</div>
        <div class="event-date">${ev.date}</div>
        <div class="event-location">${ev.location}</div>
        <div class="event-type" style="color:#ff6b6b;font-size:0.98rem;margin-bottom:0.5rem;">${ev.genre.replace(' ', ' · ')}</div>
        <div class="event-desc">${ev.desc}</div>
        <div class="event-action">
          <button onclick="openRegister(${i})">Book Ticket</button>
        </div>
      </div>
    `;
 // 3D tilt effect on hover
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
    grid.appendChild(card);
  });
}
filterEvents();


