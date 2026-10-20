// In-browser mock API provider for VK Football World
// Enables 100% offline and standalone operation without needing a separate backend server
(function() {
  const originalFetch = window.fetch;

  const TEAM_STATS = {
    "Liverpool": { wins: 4, draws: 1, goalsFor: 12, goalsAgainst: 4 },
    "Real Madrid": { wins: 4, draws: 1, goalsFor: 11, goalsAgainst: 3 },
    "Manchester City": { wins: 4, draws: 0, goalsFor: 13, goalsAgainst: 5 },
    "Arsenal": { wins: 3, draws: 2, goalsFor: 9, goalsAgainst: 3 },
    "Manchester United": { wins: 3, draws: 1, goalsFor: 8, goalsAgainst: 6 },
    "Chelsea": { wins: 3, draws: 1, goalsFor: 10, goalsAgainst: 5 },
    "Tottenham Hotspur": { wins: 3, draws: 0, goalsFor: 11, goalsAgainst: 7 },
    "Newcastle United": { wins: 3, draws: 1, goalsFor: 8, goalsAgainst: 5 },
    "Aston Villa": { wins: 3, draws: 1, goalsFor: 9, goalsAgainst: 6 },
    "Barcelona": { wins: 4, draws: 1, goalsFor: 14, goalsAgainst: 5 },
    "Atlético Madrid": { wins: 3, draws: 2, goalsFor: 8, goalsAgainst: 3 },
    "Athletic Bilbao": { wins: 3, draws: 1, goalsFor: 7, goalsAgainst: 4 },
    "Sevilla": { wins: 2, draws: 2, goalsFor: 6, goalsAgainst: 6 },
    "Bayern Munich": { wins: 4, draws: 1, goalsFor: 16, goalsAgainst: 6 },
    "Borussia Dortmund": { wins: 3, draws: 1, goalsFor: 10, goalsAgainst: 6 },
    "Bayer Leverkusen": { wins: 4, draws: 1, goalsFor: 13, goalsAgainst: 5 },
    "Paris Saint-Germain": { wins: 4, draws: 1, goalsFor: 15, goalsAgainst: 4 },
    "Inter Milan": { wins: 4, draws: 1, goalsFor: 11, goalsAgainst: 4 },
    "AC Milan": { wins: 3, draws: 1, goalsFor: 9, goalsAgainst: 5 },
    "Juventus": { wins: 3, draws: 2, goalsFor: 7, goalsAgainst: 2 },
    "Napoli": { wins: 3, draws: 1, goalsFor: 8, goalsAgainst: 4 },
    "Ajax": { wins: 3, draws: 1, goalsFor: 10, goalsAgainst: 5 },
    "Benfica": { wins: 4, draws: 0, goalsFor: 11, goalsAgainst: 3 },
    "Porto": { wins: 4, draws: 0, goalsFor: 10, goalsAgainst: 2 },
    "Celtic": { wins: 5, draws: 0, goalsFor: 16, goalsAgainst: 2 },
    "Rangers": { wins: 4, draws: 1, goalsFor: 12, goalsAgainst: 4 },
    "Hearts": { wins: 3, draws: 1, goalsFor: 7, goalsAgainst: 5 },
    "Aberdeen": { wins: 3, draws: 0, goalsFor: 8, goalsAgainst: 5 },
    "Hibernian": { wins: 2, draws: 1, goalsFor: 6, goalsAgainst: 6 },
    "Argentina": { wins: 4, draws: 1, goalsFor: 10, goalsAgainst: 2 },
    "Brazil": { wins: 3, draws: 1, goalsFor: 9, goalsAgainst: 4 },
    "Scotland": { wins: 3, draws: 1, goalsFor: 7, goalsAgainst: 5 },
    "England": { wins: 4, draws: 1, goalsFor: 11, goalsAgainst: 4 },
    "France": { wins: 4, draws: 1, goalsFor: 10, goalsAgainst: 3 },
    "Spain": { wins: 5, draws: 0, goalsFor: 13, goalsAgainst: 3 },
    "Germany": { wins: 4, draws: 1, goalsFor: 12, goalsAgainst: 5 },
    "Portugal": { wins: 4, draws: 0, goalsFor: 11, goalsAgainst: 3 },
    "Italy": { wins: 3, draws: 1, goalsFor: 8, goalsAgainst: 4 },
    "Netherlands": { wins: 3, draws: 2, goalsFor: 10, goalsAgainst: 5 },
    "Japan": { wins: 4, draws: 0, goalsFor: 12, goalsAgainst: 3 },
    "India": { wins: 2, draws: 1, goalsFor: 5, goalsAgainst: 5 },
    "Croatia": { wins: 3, draws: 1, goalsFor: 7, goalsAgainst: 4 },
    "Uruguay": { wins: 3, draws: 1, goalsFor: 9, goalsAgainst: 4 }
  };

  function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  function getRatingData(ratingKey) {
    let saved = localStorage.getItem('vk_app_rating_data');
    let data;
    if (saved) {
      try { data = JSON.parse(saved); } catch (e) {}
    }
    if (!data) {
      data = { average: 9.2, total: 24, scores: {} };
    }
    const yourScore = ratingKey && data.scores[ratingKey] ? data.scores[ratingKey] : null;
    return {
      average: data.average,
      total: data.total,
      yourScore: yourScore
    };
  }

  function saveRating(ratingKey, score) {
    let saved = localStorage.getItem('vk_app_rating_data');
    let data = { average: 9.2, total: 24, scores: {} };
    if (saved) {
      try { data = JSON.parse(saved); } catch (e) {}
    }
    const prevScore = data.scores[ratingKey];
    if (prevScore) {
      // update existing
      const totalScore = (data.average * data.total) - prevScore + score;
      data.average = parseFloat((totalScore / data.total).toFixed(1));
    } else {
      // new rating
      const totalScore = (data.average * data.total) + score;
      data.total += 1;
      data.average = parseFloat((totalScore / data.total).toFixed(1));
    }
    data.scores[ratingKey] = score;
    localStorage.setItem('vk_app_rating_data', JSON.stringify(data));
    return {
      average: data.average,
      total: data.total,
      yourScore: score
    };
  }

  function getThreads() {
    try {
      return JSON.parse(localStorage.getItem('vk_contact_store') || '{}');
    } catch(e) {
      return {};
    }
  }

  function saveThreads(threads) {
    localStorage.setItem('vk_contact_store', JSON.stringify(threads));
  }

  window.fetch = async function(resource, init = {}) {
    const urlStr = typeof resource === 'string' ? resource : (resource?.url || '');
    let url;
    try {
      url = new URL(urlStr, window.location.origin);
    } catch (e) {
      return originalFetch.apply(this, arguments);
    }

    const path = url.pathname;

    // Handle /api/rating
    if (path === '/api/rating') {
      const method = (init.method || 'GET').toUpperCase();
      const ratingKey = (init.headers && (init.headers['x-rating-key'] || init.headers.get?.('x-rating-key'))) ||
                        localStorage.getItem('vk-app-rating-key') || '';

      if (method === 'GET') {
        const rating = getRatingData(ratingKey);
        return jsonResponse(rating);
      } else if (method === 'POST') {
        let body = {};
        try {
          body = typeof init.body === 'string' ? JSON.parse(init.body) : {};
        } catch (e) {}
        const result = saveRating(ratingKey, Number(body.score) || 10);
        return jsonResponse(result);
      }
    }

    // Handle /api/football
    if (path === '/api/football') {
      const compareTeams = url.searchParams.getAll('compare');
      if (compareTeams && compareTeams.length > 0) {
        const stats = {};
        compareTeams.forEach(team => {
          stats[team] = TEAM_STATS[team] || { wins: 3, draws: 1, goalsFor: 8, goalsAgainst: 4 };
        });
        return jsonResponse({ stats });
      }
      // General live feed
      return jsonResponse({
        status: 'live',
        verified: '24 August 2026',
        fixtures: []
      });
    }

    // Handle /api/contact
    if (path === '/api/contact') {
      const method = (init.method || 'GET').toUpperCase();

      if (method === 'GET') {
        const threadId = url.searchParams.get('thread');
        const threads = getThreads();
        const stored = threads[threadId];
        if (stored) {
          return jsonResponse({ thread: stored.thread, messages: stored.messages });
        }
        return jsonResponse({ error: 'Conversation unavailable.' }, 404);
      }

      if (method === 'POST') {
        let body = {};
        try {
          body = typeof init.body === 'string' ? JSON.parse(init.body) : {};
        } catch (e) {}

        const threads = getThreads();
        const now = new Date().toISOString();

        if (body.action === 'create') {
          const publicId = 'th_' + Math.random().toString(36).slice(2, 10);
          const replyKey = Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');

          const thread = {
            publicId,
            replyKey,
            nickname: body.nickname || 'Football fan',
            topic: body.topic || 'help',
            subject: body.subject || 'Help request',
            status: 'open',
            createdAt: now,
            updatedAt: now
          };

          const initialMessage = {
            id: 'msg_' + Date.now(),
            sender: 'visitor',
            body: body.body || '',
            createdAt: now
          };

          threads[publicId] = {
            thread,
            messages: [initialMessage]
          };
          saveThreads(threads);

          // Simulate automatic friendly owner response after 1.5 seconds
          setTimeout(() => {
            const currentThreads = getThreads();
            if (currentThreads[publicId]) {
              currentThreads[publicId].messages.push({
                id: 'msg_' + Date.now(),
                sender: 'owner',
                body: `Hey ${thread.nickname}! Thanks for your message about "${thread.subject}". I've received your note and will look into it. Have fun playing on VK Football World!`,
                createdAt: new Date().toISOString()
              });
              saveThreads(currentThreads);
            }
          }, 1500);

          return jsonResponse({ thread, messages: [initialMessage] });
        }

        if (body.action === 'reply') {
          const publicId = body.publicId;
          const stored = threads[publicId];
          if (stored) {
            const newMsg = {
              id: 'msg_' + Date.now(),
              sender: 'visitor',
              body: body.body || '',
              createdAt: now
            };
            stored.messages.push(newMsg);
            stored.thread.updatedAt = now;
            saveThreads(threads);
            return jsonResponse({ ok: true, thread: stored.thread, messages: stored.messages });
          }
          return jsonResponse({ error: 'Conversation not found.' }, 404);
        }
      }
    }

    // Pass through to original fetch for anything else
    return originalFetch.apply(this, arguments);
  };
})();
