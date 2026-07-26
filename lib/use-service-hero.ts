'use client';

import { useEffect, useState } from 'react';

const API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

interface ServiceHero {
  heroImageUrl: string;
  cardImageUrl: string;
}

export function useServiceHero(service: string): ServiceHero {
  const [hero, setHero] = useState<ServiceHero>({ heroImageUrl: '', cardImageUrl: '' });

  useEffect(() => {
    fetch(`${API}/api/service-settings/${service}`)
      .then(r => r.json())
      .then(d => {
        if (d && typeof d === 'object') {
          setHero({
            heroImageUrl: d.heroImageUrl || '',
            cardImageUrl: d.cardImageUrl || '',
          });
        }
      })
      .catch(() => {});
  }, [service]);

  return hero;
}
