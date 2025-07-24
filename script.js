document.getElementById('mobile-menu-button').addEventListener('click', function() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu');
          if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
          }
        }
      });
    });

  // Enhanced Chatbot Functionality
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

// More comprehensive responses for the chatbot
const botResponses = {
  greetings: [
    "Halo! Saya BOFAL, asisten digital MentalGuard. Saya di sini untuk mendukung perjalananmu menuju kesehatan mental yang lebih baik. Bagaimana perasaanmu hari ini?",
    "Hai! Senang bertemu denganmu. Saya siap mendengarkan ceritamu tentang apa saja yang mengganggu pikiranmu.",
    "Selamat datang di MentalGuard! Sebelum kita mulai, bagaimana kabarmu hari ini? (Kamu bisa jawab dengan jujur, ini ruang yang aman)"
  ],
  stress: [
    "Stres bisa terasa berat, tapi kamu tidak sendirian. Mari kita pecahkan ini bersama. Bisakah kamu ceritakan lebih detail apa yang membuatmu stres?",
    "Saya mendengar bahwa kamu sedang stres. Pernahkah kamu mencoba teknik pernapasan 4-7-8? Tarik napas 4 detik, tahan 7 detik, buang 8 detik. Mau saya pandu melakukannya sekarang?",
    "Stres yang kamu rasakan valid. Sebelum kita lanjut, saya ingin kamu tahu: kamu lebih kuat dari yang kamu kira. Apa ada situasi spesifik yang ingin kamu bahas?"
  ],
  gambling: {
    initial: [
      "Mengakui bahwa ada masalah dengan judi adalah langkah sangat berani. Saya bangga padamu. Bisakah kamu ceritakan kapan terakhir kali kamu berjudi dan apa yang memicunya?",
      "Kecanduan judi bisa sangat menantang, tapi pemulihan itu mungkin. Berapa lama kamu sudah berjuang dengan ini?",
      "Saya di sini untuk mendukungmu. Bisa ceritakan bagaimana judi online mempengaruhi hidupmu sehari-hari?"
    ],
    urge: [
      "Keinginan berjudi biasanya datang seperti gelombang - intens tapi sementara. Coba tahan 15 menit lagi dengan melakukan aktivitas lain. Apa yang bisa kamu lakukan selama 15 menit ini?",
      "Ketika keinginan berjudi muncul, ingatlah alasan utama kamu ingin berhenti. Mau kita buat daftar alasan itu bersama sekarang?",
      "Keinginan berjudi akan berlalu. Sementara ini, coba minum segelas air dingin dan tarik napas dalam. Mau saya pandu latihan pernapasan singkat?"
    ],
    relapse: [
      "Kambuh adalah bagian dari proses pemulihan, bukan kegagalan. Apa yang bisa kamu pelajari dari pengalaman ini?",
      "Jangan terlalu keras pada dirimu sendiri. Mari kita evaluasi apa yang memicu kekambuhan ini dan buat strategi untuk berikutnya.",
      "Setiap hari adalah kesempatan baru. Apa satu hal kecil yang bisa kamu lakukan hari ini untuk kembali ke jalur pemulihan?"
    ]
  },
  sad: [
    "Saya turut merasakan kesedihanmu. Terkadang kita memang perlu merasakan emosi ini. Apakah ada yang ingin kamu ceritakan lebih lanjut?",
    "Kesedihan bisa terasa menyakitkan, tapi ingatlah bahwa perasaan ini tidak permanen. Apa yang biasanya membantumu saat merasa seperti ini?",
    "Saya di sini untuk mendengarkan. Kamu tidak sendirian dalam perasaan ini. Bisakah kamu gambarkan seperti apa kesedihan yang kamu rasakan?"
  ],
  anxious: [
    "Kecemasan bisa terasa menakutkan, tapi kamu aman sekarang. Coba sebutkan 3 benda yang bisa kamu lihat di sekitarmu. Ini bisa membantu membawamu kembali ke saat ini.",
    "Ketika cemas, tubuh kita bereaksi seolah ada bahaya. Tapi kamu kuat. Mau kita coba teknik grounding bersama? Sebutkan: 5 hal yang kamu lihat, 4 yang bisa kamu sentuh, 3 yang bisa kamu dengar, 2 yang bisa kamu cium, 1 yang bisa kamu rasakan.",
    "Kecemasan adalah pembohong yang meyakinkan. Apa yang sebenarnya terjadi vs apa yang dikatakan kecemasanmu padamu?"
  ],
  default: [
    "Saya mencoba memahami apa yang kamu rasakan. Bisakah kamu menjelaskannya dengan cara lain?",
    "Terima kasih telah berbagi. Saya ingin memastikan saya paham - bisa kamu jelaskan lebih detail?",
    "Setiap pengalaman itu unik. Saya di sini untuk mendengarkan ceritamu lebih lanjut."
  ],
  resources: [
    "MentalGuard punya beberapa alat yang mungkin membantumu:\n1. Mood Tracker untuk pantau emosi harian\n2. Artikel tentang mengatasi kecanduan\n3. Teknik relaksasi\nMau tahu lebih banyak tentang yang mana?",
    "Ada beberapa teknik yang bisa kita coba sekarang:\n- Latihan pernapasan\n- Pemetaan pemicu judi\n- Membuat daftar kegiatan pengganti\nKamu tertarik mencoba yang mana?",
    "Saya bisa membantumu menemukan:\n✔ Layanan profesional terdekat\n✔ Grup dukungan online\n✔ Strategi mengatasi keinginan berjudi\nApa yang paling kamu butuhkan sekarang?"
  ]
};

// Track conversation context
let conversationContext = {
  lastTopic: null,
  userName: null,
  gamblingStatus: null,
  lastResponseType: null
};

// Function to add a message to the chat log with improved formatting
function addMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-bubble', 'rounded-lg', 'p-4', 'max-w-[80%]', 'my-2');
  
  if (sender === 'user') {
    messageDiv.classList.add('bg-blue-100', 'self-end', 'rounded-br-none');
    messageDiv.innerHTML = `
      <p class="text-gray-800">${message}</p>
      <p class="text-xs text-gray-500 text-right mt-1">Anda</p>
    `;
  } else {
    messageDiv.classList.add('bg-gray-100', 'self-start', 'rounded-bl-none');
    messageDiv.innerHTML = `
      <div class="flex items-start mb-1">
        <span class="font-bold text-blue-600 mr-2">BOFAL:</span>
        <p class="text-gray-800">${message}</p>
      </div>
      <p class="text-xs text-gray-500">Asisten MentalGuard</p>
    `;
  }
  
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Improved typing simulation with better visual feedback
function simulateTyping(callback) {
  const typingIndicator = document.getElementById('typing-indicator');
  typingIndicator.style.width = '0%';
  typingIndicator.classList.remove('hidden');
  
  let width = 0;
  const interval = setInterval(() => {
    width += 5 + Math.random() * 15; // Variable speed for more natural feel
    if (width > 100) width = 100;
    typingIndicator.style.width = `${width}%`;
    
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        typingIndicator.style.width = '0%';
        typingIndicator.classList.add('hidden');
        callback();
      }, 200);
    }
  }, 100);
}

// Enhanced response handling with context awareness
function generateResponse(message) {
  message = message.toLowerCase();
  
  // Check for greetings
  if (/(halo|hai|hi|selamat|pagi|siang|sore|malam)/i.test(message) && !conversationContext.lastTopic) {
    conversationContext.lastTopic = 'greetings';
    return getRandomResponse('greetings');
  }
  
  // Check for gambling-related topics
  if (/(judi|gambling|taruhan|slot|judi online|kecanduan|kambuh|relaps)/i.test(message)) {
    if (/(ingin|pengen|pengin|mau|keinginan|ingin|craving)/i.test(message)) {
      conversationContext.lastTopic = 'gambling:urge';
      return getRandomResponse('gambling.urge');
    } else if (/(kambuh|relaps|gagal|kembali)/i.test(message)) {
      conversationContext.lastTopic = 'gambling:relapse';
      return getRandomResponse('gambling.relapse');
    } else {
      conversationContext.lastTopic = 'gambling:initial';
      return getRandomResponse('gambling.initial');
    }
  }
  
  // Check for emotional states
  if (/(stres|tekanan|beban|pusing|penat)/i.test(message)) {
    conversationContext.lastTopic = 'stress';
    return getRandomResponse('stress');
  }
  
  if (/(sedih|murung|putus asa|down|tertekan)/i.test(message)) {
    conversationContext.lastTopic = 'sad';
    return getRandomResponse('sad');
  }
  
  if (/(cemas|gelisah|khawatir|takut|panik)/i.test(message)) {
    conversationContext.lastTopic = 'anxious';
    return getRandomResponse('anxious');
  }
  
  // Check for resource requests
  if (/(bantuan|tolong|sumber|resource|alat|tool|tips|saran)/i.test(message)) {
    conversationContext.lastTopic = 'resources';
    return getRandomResponse('resources');
  }
  
  // If no specific topic detected, continue current context or use default
  if (conversationContext.lastTopic) {
    const [category, subcategory] = conversationContext.lastTopic.split(':');
    if (subcategory && botResponses[category]?.[subcategory]) {
      return getRandomResponse(`${category}.${subcategory}`);
    } else if (botResponses[category]) {
      return getRandomResponse(category);
    }
  }
  
  return getRandomResponse('default');
}

// Helper function to get random response
function getRandomResponse(path) {
  const parts = path.split('.');
  let responses = botResponses;
  
  for (const part of parts) {
    responses = responses[part];
    if (!responses) break;
  }
  
  if (!Array.isArray(responses)) {
    return "Saya ingin memahami lebih baik. Bisakah kamu menjelaskannya dengan cara lain?";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Enhanced chat handling with context tracking
function handleChat() {
  const message = userInput.value.trim();
  if (message === '') return;
  
  // Add user message
  addMessage('user', message);
  userInput.value = '';
  
  // Disable input and button while bot is "thinking"
  userInput.disabled = true;
  document.getElementById('send-button').disabled = true;
  document.getElementById('button-text').textContent = 'BOFAL mengetik...';
  
  // Simulate typing and then respond
  simulateTyping(() => {
    const response = generateResponse(message);
    
    // Split long responses into multiple messages for better readability
    if (response.length > 160) {
      const sentences = response.split(/(?<=[.!?])\s+/);
      let currentMessage = '';
      
      for (const sentence of sentences) {
        if ((currentMessage + sentence).length > 160) {
          addMessage('bot', currentMessage);
          currentMessage = sentence;
        } else {
          currentMessage += (currentMessage ? ' ' : '') + sentence;
        }
      }
      
      if (currentMessage) {
        addMessage('bot', currentMessage);
      }
    } else {
      addMessage('bot', response);
    }
    
    // Re-enable input and button
    userInput.disabled = false;
    document.getElementById('send-button').disabled = false;
    document.getElementById('button-text').textContent = 'Kirim';
    userInput.focus();
  });
}

// Quick response buttons with more relevant options
function quickResponse(message) {
  userInput.value = message;
  handleChat();
}

// Allow pressing Enter to send message
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    handleChat();
  }
});

// Initialize with a more engaging welcome message
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const welcomeMessages = [
      "Halo! Saya BOFAL, teman digitalmu di MentalGuard. Sebelum kita mulai, boleh saya tahu namamu?",
      "Selamat datang di MentalGuard! Saya siap mendukung perjalanan kesehatan mentalmu. Boleh kenalan dulu? Namamu siapa?",
      "Hai! Senang bertemu denganmu. Saya BOFAL. Agar lebih personal, boleh saya tahu namamu?"
    ];
    
    const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    addMessage('bot', randomWelcome);
  }, 1000);
  
  // Add event listener for send button
  document.getElementById('send-button').addEventListener('click', handleChat);
});

    // Function to handle chat
    function handleChat() {
      const message = userInput.value.trim();
      if (message === '') return;
      
      // Add user message
      addMessage('user', message);
      userInput.value = '';
      
      // Disable input and button while bot is "thinking"
      userInput.disabled = true;
      document.getElementById('send-button').disabled = true;
      document.getElementById('button-text').textContent = 'Mengetik...';
      
      // Simulate typing and then respond
      simulateTyping(() => {
        // Determine bot response based on user input
        let responseCategory = 'default';
        
        if (message.toLowerCase().includes('halo') || message.toLowerCase().includes('hai')) {
          responseCategory = 'greetings';
        } else if (message.toLowerCase().includes('stres') || message.toLowerCase().includes('tekanan')) {
          responseCategory = 'stress';
        } else if (message.toLowerCase().includes('judi') || message.toLowerCase().includes('gambling') || message.toLowerCase().includes('kecanduan')) {
          responseCategory = 'gambling';
        } else if (message.toLowerCase().includes('sedih') || message.toLowerCase().includes('murung') || message.toLowerCase().includes('putus asa')) {
          responseCategory = 'sad';
        } else if (message.toLowerCase().includes('cemas') || message.toLowerCase().includes('gelisah') || message.toLowerCase().includes('khawatir')) {
          responseCategory = 'anxious';
        }
        
        const possibleResponses = botResponses[responseCategory] || botResponses.default;
        const randomResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
        
        addMessage('bot', randomResponse);
        
        // Re-enable input and button
        userInput.disabled = false;
        document.getElementById('send-button').disabled = false;
        document.getElementById('button-text').textContent = 'Kirim';
        userInput.focus();
      });
    }

    // Quick response buttons
    function quickResponse(message) {
      userInput.value = message;
      handleChat();
    }

    // Allow pressing Enter to send message
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleChat();
      }
    });

    // Mood Tracker Functionality
    const moodData = JSON.parse(localStorage.getItem('moodData')) || [];
    const moodList = document.getElementById('mood-list');
    let moodChart = null;

    // Mood emoji mapping
    const moodEmoji = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      neutral: '😐',
      anxious: '😰'
      
    };

    // Mood color mapping
    const moodColors = {
      happy: '#FBBF24',
      sad: '#60A5FA',
      angry: '#F87171',
      neutral: '#9CA3AF',
      anxious: '#A78BFA'
    };

    // Mood text mapping
    const moodText = {
      happy: 'Bahagia',
      sad: 'Sedih',
      angry: 'Marah',
      neutral: 'Biasa saja',
      anxious: 'Cemas/Gelisah'
    };

    // Save mood function
    function saveMood() {
      const moodSelect = document.getElementById('mood-select');
      const moodNotes = document.getElementById('mood-notes');
      
      const mood = moodSelect.value;
      const notes = moodNotes.value.trim();
      const date = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      if (!mood) {
        alert('Silakan pilih mood terlebih dahulu');
        return;
      }
      
      const moodEntry = {
        mood,
        notes,
        date
      };
      
      moodData.unshift(moodEntry); // Add to beginning of array
      localStorage.setItem('moodData', JSON.stringify(moodData));
      
      // Update UI
      updateMoodList();
      updateMoodChart();
      
      // Reset form
      moodSelect.value = '';
      moodNotes.value = '';
      
      // Show success message
      alert('Mood berhasil disimpan!');
    }

    // Update mood list
    function updateMoodList() {
      moodList.innerHTML = '';
      
      const recentMoods = moodData.slice(0, 10); // Show only last 10 entries
      
      if (recentMoods.length === 0) {
        moodList.innerHTML = '<li class="text-gray-500">Belum ada data mood</li>';
        return;
      }
      
      recentMoods.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'py-2 border-b border-gray-100 last:border-0';
        
        li.innerHTML = `
          <div class="flex items-start">
            <span class="text-2xl mr-3">${moodEmoji[entry.mood]}</span>
            <div>
              <div class="font-medium">${moodText[entry.mood]} - <span class="text-sm text-gray-500">${entry.date}</span></div>
              ${entry.notes ? `<div class="text-sm text-gray-600 mt-1">${entry.notes}</div>` : ''}
            </div>
          </div>
        `;
        
        moodList.appendChild(li);
      });
    }

    // Update mood chart
    function updateMoodChart() {
      const ctx = document.getElementById('moodChart').getContext('2d');
      
      // Group by date and count moods
      const moodCounts = {};
      const moodTypes = ['happy', 'sad', 'angry', 'neutral', 'anxious'];
      
      // Initialize counts
      moodTypes.forEach(type => {
        moodCounts[type] = 0;
      });
      
      // Count last 7 days
      const last7Days = moodData.slice(0, 7);
      last7Days.forEach(entry => {
        moodCounts[entry.mood]++;
      });
      
      // Prepare chart data
      const chartData = {
        labels: moodTypes.map(type => moodText[type]),
        datasets: [{
          data: moodTypes.map(type => moodCounts[type]),
          backgroundColor: moodTypes.map(type => moodColors[type]),
          borderWidth: 1
        }]
      };
      
      // Destroy previous chart if exists
      if (moodChart) {
        moodChart.destroy();
      }
      
      // Create new chart
      moodChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${value} kali`;
                }
              }
            }
          }
        }
      });
    }

    // Modal functionality
    function showArticle(type) {
      const modal = document.getElementById('article-modal');
      const title = document.getElementById('modal-title');
      const content = document.getElementById('modal-content');
      
      let articleTitle = '';
      let articleContent = '';
      
      switch(type) {
        case 'gambling':
          articleTitle = 'Bahaya Judi Online dan Dampaknya pada Kesehatan Mental';
          articleContent = `
            <h4>Mengapa Judi Online Sangat Berbahaya?</h4>
            <p>Judi online telah menjadi epidemi modern dengan konsekuensi yang menghancurkan bagi kesehatan mental:</p>
            <ul>
              <li><strong>Kecanduan yang cepat:</strong> Akses 24/7 membuat ketergantungan berkembang lebih cepat dibanding judi konvensional</li>
              <li><strong>Masalah keuangan:</strong> Rata-rata pecandu judi online kehilangan Rp 50-100 juta sebelum menyadari masalahnya</li>
              <li><strong>Isolasi sosial:</strong> Kebiasaan berjudi sendirian di depan layar memperparah kesepian dan depresi</li>
              <li><strong>Gangguan mental:</strong> 65% pecandu judi online mengalami gangguan kecemasan atau depresi klinis</li>
            </ul>
            
            <h4>Tanda-tanda Kecanduan Judi Online</h4>
            <p>Waspadai gejala berikut pada diri sendiri atau orang terdekat:</p>
            <ul>
              <li>Selalu memikirkan tentang judi atau cara mendapatkan uang untuk berjudi</li>
              <li>Meningkatnya jumlah taruhan untuk mencapai sensasi yang sama</li>
              <li>Gagal berulang kali dalam upaya mengontrol atau menghentikan kebiasaan judi</li>
              <li>Gelisah atau mudah marah ketika mencoba mengurangi judi</li>
              <li>Berjudi untuk melarikan diri dari masalah atau menghilangkan perasaan tidak enak</li>
              <li>Berbohong kepada keluarga untuk menyembunyikan tingkat keterlibatan dalam judi</li>
              <li>Mengorbankan hubungan penting, pekerjaan, atau kesempatan pendidikan karena judi</li>
            </ul>
            
            <h4>Langkah Pertama untuk Pemulihan</h4>
            <p>Jika Anda atau orang terdekat menunjukkan tanda-tanda kecanduan:</p>
            <ol>
              <li><strong>Akuilah masalahnya:</strong> Pengakuan adalah langkah pertama menuju pemulihan</li>
              <li><strong>Cari dukungan profesional:</strong> Psikolog atau konselor kecanduan dapat membantu</li>
              <li><strong>Blokir akses:</strong> Gunakan aplikasi pemblokir situs judi dan hapus aplikasi terkait</li>
              <li><strong>Temukan aktivitas pengganti:</strong> Olahraga, hobi baru, atau kegiatan sosial dapat mengalihkan keinginan</li>
              <li><strong>Kelola keuangan:</strong> Serahkan pengelolaan uang kepada orang tepercaya sementara waktu</li>
            </ol>
          `;
          break;
          
        case 'mental-health':
          articleTitle = 'Tips Menjaga Kesehatan Mental Sehari-hari';
          articleContent = `
            <h4>5 Teknik Sederhana untuk Mengelola Stres</h4>
            <ol>
              <li>
                <strong>Pernapasan 4-7-8:</strong> Tarik napas selama 4 hitungan, tahan 7 hitungan, buang napas selama 8 hitungan. Ulangi 4 kali.
              </li>
              <li>
                <strong>Teknik 5-4-3-2-1:</strong> Ketika cemas, identifikasi 5 hal yang bisa dilihat, 4 yang bisa disentuh, 3 yang bisa didengar, 2 yang bisa dicium, dan 1 yang bisa dirasakan.
              </li>
              <li>
                <strong>Jurnal Emosi:</strong> Tuliskan perasaan Anda setiap hari untuk melacak pola dan pemicu.
              </li>
              <li>
                <strong>Batasan Digital:</strong> Tetapkan waktu bebas gawai setiap hari untuk mengurangi kecemasan.
              </li>
              <li>
                <strong>Gerakan Tubuh:</strong> Aktivitas fisik ringan seperti jalan kaki 10 menit dapat meningkatkan mood.
              </li>
            </ol>
            
            <h4>Membangun Ketahanan Mental</h4>
            <p>Ketahanan mental adalah kemampuan untuk bangkit dari kesulitan. Berikut cara meningkatkannya:</p>
            <ul>
              <li><strong>Terima perubahan:</strong> Perubahan adalah bagian alami kehidupan yang tidak bisa kita hindari</li>
              <li><strong>Jaga perspektif:</strong> Lihat kesulitan dalam konteks yang lebih luas, bukan sebagai bencana permanen</li>
              <li><strong>Rawatan diri:</strong> Prioritaskan tidur, nutrisi, dan relaksasi yang cukup</li>
              <li><strong>Kembangkan jaringan sosial:</strong> Hubungan yang mendukung adalah penyangga penting saat stres</li>
              <li><strong>Belajar dari pengalaman:</strong> Refleksikan bagaimana Anda menangani kesulitan di masa lalu</li>
            </ul>
            
            <h4>Kapan Mencari Bantuan Profesional?</h4>
            <p>Pertimbangkan konsultasi dengan ahli jika mengalami:</p>
            <ul>
              <li>Perasaan sedih atau cemas yang bertahan lebih dari 2 minggu</li>
              <li>Perubahan signifikan dalam pola tidur atau makan</li>
              <li>Kesulitan berkonsentrasi atau menyelesaikan tugas sehari-hari</li>
              <li>Pikiran untuk menyakiti diri sendiri atau orang lain</li>
              <li>Penggunaan zat atau perilaku kompulsif (seperti judi) untuk mengatasi emosi</li>
            </ul>
          `;
          break;
          
        case 'help':
          articleTitle = 'Layanan Bantuan untuk Kecanduan Judi dan Masalah Mental';
          articleContent = `
            <h4>Layanan Darurat 24 Jam</h4>
            <ul>
              <li><strong>Hotline Kementerian Kesehatan:</strong> 119 (ekstensi 8 untuk masalah jiwa)</li>
              <li><strong>Into The Light Indonesia:</strong> 021-500-454 (Pencegahan bunuh diri)</li>
              <li><strong>Halo Kemenkes:</strong> 1500-567 (Konseling kesehatan jiwa)</li>
            </ul>
            
            <h4>Klinik dan Rumah Sakit Jiwa</h4>
            <p>Beberapa fasilitas yang menangani kecanduan judi dan masalah mental:</p>
            <ul>
              <li><strong>RSJ Dr. Soeharto Heerdjan Jakarta:</strong> Layanan khusus kecanduan perilaku</li>
              <li><strong>RSJ Prof. Dr. Soerojo Magelang:</strong> Program rehabilitasi kecanduan komprehensif</li>
              <li><strong>Klinik Pratama Jaya Jakarta:</strong> Terapi kognitif perilaku untuk kecanduan</li>
            </ul>
            
            <h4>Komunitas Pendukung</h4>
            <ul>
              <li><strong>Gamblers Anonymous Indonesia:</strong> Pertemuan mingguan untuk pecandu judi</li>
              <li><strong>Komunitas Peduli Kesehatan Jiwa:</strong> Grup dukungan online dan offline</li>
              <li><strong>Into The Light:</strong> Fokus pada pencegahan bunuh diri di kalangan muda</li>
            </ul>
            
            <h4>Aplikasi Pendukung</h4>
            <ul>
              <li><strong>MentalGuard (ini loh!):</strong> Mood tracker dan konseling AI</li>
              <li><strong>Riliv:</strong> Meditasi dan konseling online</li>
              <li><strong>Gamblock:</strong> Aplikasi pemblokir situs judi</li>
            </ul>
            
            <h4>Bantuan Online</h4>
            <ul>
              <li><strong>Situs Kementerian Kesehatan:</strong> Informasi kesehatan jiwa terkini</li>
              <li><strong>Into The Light Web:</strong> Sumber daya pencegahan bunuh diri</li>
              <li><strong>Forum dukungan:</strong> Tempat berbagi pengalaman tanpa judgement</li>
            </ul>
          `;
          break;
      }
      
      title.textContent = articleTitle;
      content.innerHTML = articleContent;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      const modal = document.getElementById('article-modal');
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
      updateMoodList();
      updateMoodChart();
      // Add event listener for send button
      document.getElementById('send-button').addEventListener('click', handleChat);
      
      
      // Add welcome message to chat
      setTimeout(() => {
        const welcomeMessages = [
          "Selamat datang di MentalGuard! Saya siap mendengarkan ceritamu.",
          "Hai! Bagaimana kabarmu hari ini? Saya di sini untuk membantumu.",
          "Halo! MentalGuard hadir untuk mendukung kesehatan mentalmu. Ada yang bisa saya bantu?"
        ];
        
        const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        addMessage('bot', randomWelcome);
      }, 1000);
    });