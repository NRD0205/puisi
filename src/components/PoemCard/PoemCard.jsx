import React, { useRef, useEffect, useState } from 'react';
import './PoemCard.css';

/**
 * PoemCard — The central glassmorphism textbox displaying the poem
 * "Tentang Bulan". Each stanza fades in with a smooth animation
 * as the user scrolls, encouraging slow, contemplative reading.
 */

const poemData = [
  {
    type: 'title',
    lines: ['Tentang Bulan'],
  },
  {
    type: 'stanza',
    lines: [
      'Orang-orang sering berkata,',
      'bulan itu indah.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Mereka mengagumi cahayanya,',
      'mengabadikannya dalam foto,',
      'lalu melanjutkan hidup seperti biasa.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Namun aku rasa,',
      'keindahan bulan bukan hanya tentang bagaimana ia bersinar.',
    ],
  },
  {
    type: 'stanza',
    lines: ['Yang membuatku kagum adalah caranya tetap hadir.'],
  },
  {
    type: 'stanza',
    lines: [
      'Ia datang setiap malam,',
      'menemani langit yang gelap,',
      'tanpa pernah meminta langit untuk berterima kasih.',
    ],
  },
  {
    type: 'stanza',
    lines: ['Kadang cahayanya penuh.'],
  },
  {
    type: 'stanza',
    lines: ['Kadang hanya menyisakan sepotong sabit.'],
  },
  {
    type: 'stanza',
    lines: ['Kadang bahkan menghilang dari pandangan.'],
  },
  {
    type: 'stanza',
    lines: [
      'Namun kita tahu,',
      'bulan tidak benar-benar pergi.',
    ],
  },
  {
    type: 'stanza',
    lines: ['Ia hanya sedang menjalani fasenya.'],
  },
  {
    type: 'stanza',
    lines: [
      'Dan di situlah aku mulai mengerti,',
      'bahwa bulan tidak pernah berusaha menjadi sama setiap malam.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Ia bisa penuh.',
      'Ia bisa sabit.',
      'Ia bisa nyaris hilang dari pandangan.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Tetapi apa pun bentuknya,',
      'bulan tetap hadir dengan tenang,',
      'seolah mengajarkan bahwa berubah bukan berarti lenyap.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Mungkin itu sebabnya',
      'aku begitu menyukai bulan.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Karena setiap kali melihatnya,',
      'aku belajar bahwa tidak semua cahaya harus bersinar paling terang',
      'untuk bisa berarti bagi seseorang.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Dan tidak semua kehadiran',
      'harus selalu terlihat,',
      'untuk bisa dirindukan.',
    ],
  },
  {
    type: 'stanza',
    lines: ['Mungkin...'],
  },
  {
    type: 'stanza',
    lines: [
      'itulah alasan mengapa,',
      'setiap kali malam tiba,',
      'aku selalu meluangkan waktu',
      'untuk melihat ke arah bulan.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Sebab di sana,',
      'aku selalu menemukan pengingat',
      'bahwa hal-hal yang paling menenangkan',
      'sering kali hadir tanpa banyak suara.',
    ],
  },
  {
    type: 'stanza',
    lines: [
      'Seseorang yang selalu punya caranya sendiri',
      'untuk membuat orang di sekitarnya merasa tenang.',
    ],
  },
];

/**
 * Individual stanza component with IntersectionObserver-driven reveal.
 */
function Stanza({ stanza, index }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (stanza.type === 'title') {
    return (
      <h1
        ref={ref}
        className={`poem-title ${isVisible ? 'poem-reveal' : 'poem-hidden'}`}
        style={{ transitionDelay: '0.1s' }}
      >
        {stanza.lines[0]}
      </h1>
    );
  }

  return (
    <div
      ref={ref}
      className={`poem-stanza ${isVisible ? 'poem-reveal' : 'poem-hidden'}`}
      style={{ transitionDelay: `${0.05 * index}s` }}
    >
      {stanza.lines.map((line, lineIdx) => (
        <p key={lineIdx} className="poem-line">
          {line}
        </p>
      ))}
    </div>
  );
}

function PoemCard() {
  return (
    <section id="poem" className="poem-section">
      <div className="poem-card">
        {/* Decorative corner accents */}
        <div className="poem-card__corner poem-card__corner--tl" />
        <div className="poem-card__corner poem-card__corner--tr" />
        <div className="poem-card__corner poem-card__corner--bl" />
        <div className="poem-card__corner poem-card__corner--br" />

        {/* Moonlight accent glow */}
        <div className="poem-card__glow" />

        {/* Poem content */}
        <div className="poem-content">
          {poemData.map((stanza, index) => (
            <Stanza key={index} stanza={stanza} index={index} />
          ))}
        </div>

        {/* Decorative divider at the end */}
        <div className="poem-end-divider">
          <span className="poem-end-star">✦</span>
        </div>
      </div>
    </section>
  );
}

export default PoemCard;
