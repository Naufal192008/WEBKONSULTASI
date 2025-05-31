 // Mobile Menu Toggle
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

    // Chatbot Functionality
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    
    // Sample responses for the chatbot
    const botResponses = {
      greetings: [
        "Halo! Saya senang Anda ada di sini. Bagaimana kabarmu hari ini?",
        "Hai! Saya Asisten MentalGuard. Ada yang bisa saya bantu?",
        "Selamat datang! Saya di sini untuk mendengarkan. Ceritakan apa yang kamu rasakan."
      ],
      stress: [
        "Stres adalah reaksi normal terhadap tekanan. Coba tarik napas dalam selama 5 detik, tahan 5 detik, lalu buang selama 5 detik. Ulangi beberapa kali.",
        "Ketika stres, coba lakukan aktivitas fisik ringan seperti berjalan kaki selama 10 menit. Ini bisa membantu mengurangi ketegangan.",
        "Stres yang berkelanjutan bisa berdampak buruk. Apakah ada situasi khusus yang membuatmu merasa stres saat ini?"
      ],
      gambling: [
        "Mengakui bahwa Anda memiliki masalah dengan judi adalah langkah pertama yang sangat berani. Mari kita bicarakan lebih lanjut.",
        "Kecanduan judi bisa sangat merusak. Apakah kamu sudah mencoba mencari bantuan profesional sebelumnya?",
        "Banyak orang berhasil mengatasi kecanduan judi. Salah satu strateginya adalah mengidentifikasi pemicu dan menghindarinya."
      ],
      sad: [
        "Saya turut bersedih mendengarnya. Ingatlah bahwa perasaan sedih itu wajar dan bersifat sementara.",
        "Ketika merasa sedih, cobalah untuk tidak mengisolasi diri. Berbicara dengan orang terdekat bisa sangat membantu.",
        "Kesedihan yang berlangsung lebih dari 2 minggu mungkin perlu diperhatikan lebih serius. Apakah kamu punya dukungan dari orang sekitar?"
      ],
      anxious: [
        "Kecemasan bisa terasa sangat menyiksa. Coba fokus pada pernapasan dan ingatkan diri bahwa ini akan berlalu.",
        "Apa yang kamu rasakan saat ini adalah respons alami tubuh. Coba buat daftar hal-hal yang bisa kamu kendalikan saat ini.",
        "Kecemasan seringkali tentang masa depan. Coba latih diri untuk fokus pada saat ini, misalnya dengan memperhatikan detil sekitar kamu."
      ],
      default: [
        "Saya mengerti. Bisa kamu ceritakan lebih detail?",
        "Terima kasih telah berbagi. Apa yang kamu harapkan dari pembicaraan ini?",
        "Saya mendengarkan. Apa ada hal lain yang ingin kamu sampaikan?"
      ]
    };

    // Function to add a message to the chat log
    function addMessage(sender, message) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('chat-bubble');
      messageDiv.classList.add(sender === 'user' ? 'user-bubble' : 'bot-bubble');
      
      const messageContent = document.createElement('p');
      messageContent.textContent = message;
      messageDiv.appendChild(messageContent);
      
      chatLog.appendChild(messageDiv);
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Function to simulate typing animation
    function simulateTyping(callback) {
      const typingIndicator = document.getElementById('typing-indicator');
      typingIndicator.style.width = '0%';
      
      let width = 0;
      const interval = setInterval(() => {
        width += 10;
        typingIndicator.style.width = `${width}%`;
        
        if (width >= 100) {
          clearInterval(interval);
          typingIndicator.style.width = '0%';
          callback();
        }
      }, 100);
    }

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