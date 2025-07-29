const CACHE_NAME = 'zhejian-homepage-v2.1.0';
const urlsToCache = [
  '/',
  '/pages/index.html',
  '/pages/about.html',
  '/config.js',
  '/assets/css/style.css?v=1.9',
  '/assets/css/about.css?v=1.9',
  '/assets/js/main.js',
  '/assets/images/profile image.jpg',
  '/assets/images/backgrounds/yosemite-8177850.jpg',
  '/assets/images/backgrounds/berchtesgaden-2928711.jpg',
  '/assets/images/backgrounds/ball-63527.jpg',
  '/assets/images/backgrounds/cityscape-6942013.jpg',
  '/assets/images/backgrounds/berlin-6755246.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.ttf'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Cache installation failed:', error);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response because it's a stream
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        );
      })
      .catch(function() {
        // If both cache and network fail, show offline page
        if (event.request.destination === 'document') {
          return caches.match('/pages/index.html');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification handling
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/images/icons/icon-192x192.png',
      badge: '/assets/images/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View Profile',
          icon: '/assets/images/icons/icon-96x96.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/assets/images/icons/icon-96x96.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Background sync completed');
}

// Message handling for communication with main thread
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Error handling
self.addEventListener('error', function(event) {
  console.error('Service Worker error:', event.error);
});

// Unhandled rejection handling
self.addEventListener('unhandledrejection', function(event) {
  console.error('Service Worker unhandled rejection:', event.reason);
}); 