import { supabase } from './supabase';
import { ContentData, Language } from '../types';

// Generic fetch function with error handling
async function fetchData<T>(query: any): Promise<T | null> {
  const { data, error } = await query;
  if (error) {
    console.error('Supabase query error:', error);
    return null;
  }
  return data;
}

// Fetch all content for a specific language
export async function fetchContentByLanguage(lang: Language): Promise<Partial<ContentData> | null> {
  try {
    // Fetch all data in parallel
    const [
      personalInfo,
      navigation,
      headers,
      skills,
      experience,
      education,
      projects,
      thoughts,
      activities,
      socials,
      consultation,
      personalTraits,
      recommendations
    ] = await Promise.all([
      fetchData(supabase.from('personal_info').select('*').eq('lang', lang).single()),
      fetchData(supabase.from('navigation').select('*').eq('lang', lang).single()),
      fetchData(supabase.from('headers').select('*').eq('lang', lang).single()),
      fetchData(supabase.from('skills').select('*').eq('lang', lang).order('display_order')),
      fetchData(supabase.from('experience').select('*').eq('lang', lang).order('display_order')),
      fetchData(supabase.from('education').select('*').eq('lang', lang).order('display_order')),
      fetchData(supabase.from('projects').select('*').eq('lang', lang).order('display_order')),
      fetchData(supabase.from('thoughts').select('*').eq('lang', lang).order('display_order', { ascending: false })),
      fetchData(supabase.from('activities').select('*').eq('lang', lang).order('display_order', { ascending: false })),
      fetchData(supabase.from('socials').select('*').eq('lang', lang).order('display_order')),
      fetchData(supabase.from('consultation').select('*').eq('lang', lang).single()),
      fetchData(supabase.from('personal_traits').select('*').eq('lang', lang).single()),
      fetchData(supabase.from('recommendations').select('*').eq('lang', lang).order('display_order'))
    ]);

    // Transform database format to ContentData format
    const contentData: Partial<ContentData> = {
      personalInfo: personalInfo ? {
        name: personalInfo.name,
        tagline: personalInfo.tagline,
        email: personalInfo.email || '',
        github: personalInfo.github || '',
        mobile: personalInfo.mobile || '',
        location: personalInfo.location || '',
        summary: personalInfo.summary || '',
        availability: personalInfo.availability || '',
        contactBtn: personalInfo.contact_btn || '',
        resumeBtn: personalInfo.resume_btn || '',
        yearsExp: personalInfo.years_exp || '',
        moneyManaged: personalInfo.money_managed || '',
        yearsLabel: personalInfo.years_label || '',
        moneyLabel: personalInfo.money_label || ''
      } : undefined,

      navigation: navigation ? {
        home: navigation.home,
        profile: navigation.profile,
        vibe: navigation.vibe,
        activities: navigation.activities,
        thoughts: navigation.thoughts,
        consultation: navigation.consultation
      } : undefined,

      headers: headers ? {
        experience: headers.experience,
        education: headers.education,
        skills: headers.skills,
        highlights: headers.highlights,
        socials: headers.socials
      } : undefined,

      skills: skills ? skills.map((s: any) => ({
        subject: s.subject,
        A: s.score,
        fullMark: s.full_mark
      })) : [],

      experience: experience ? experience.map((e: any) => ({
        id: e.id,
        role: e.role,
        company: e.company,
        period: e.period || '',
        description: e.description || '',
        achievements: e.achievements || []
      })) : [],

      education: education ? education.map((e: any) => ({
        school: e.school,
        degree: e.degree,
        period: e.period || '',
        details: e.details || []
      })) : [],

      projects: projects ? projects.map((p: any) => ({
        id: p.id,
        title: p.title,
        category: p.category || '',
        description: p.description || '',
        techStack: p.tech_stack || [],
        link: p.link,
        image: p.image,
        stats: p.stats
      })) : [],

      thoughts: thoughts ? thoughts.map((t: any) => ({
        id: t.id,
        title: t.title,
        date: t.date || '',
        tags: t.tags || [],
        snippet: t.snippet || '',
        content: t.content,
        link: t.link,
        readTime: t.read_time || ''
      })) : [],

      activities: activities ? activities.map((a: any) => ({
        id: a.id,
        title: a.title,
        role: a.role || '',
        date: a.date || '',
        location: a.location || '',
        description: a.description || '',
        images: a.images || [],
        videoUrl: a.video_url,
        tag: a.tag,
        link: a.link
      })) : [],

      socials: socials ? socials.map((s: any) => ({
        platform: s.platform,
        username: s.username || '',
        url: s.url,
        icon: s.icon || '',
        color: s.color || ''
      })) : [],

      consultation: consultation ? {
        title: consultation.title,
        price: consultation.price || '',
        description: consultation.description || '',
        topics: consultation.topics || [],
        cta: consultation.cta || ''
      } : undefined,

      personalTraits: personalTraits ? {
        mbti: personalTraits.mbti || '',
        zodiac: personalTraits.zodiac || '',
        hometown: personalTraits.hometown || '',
        hangouts: personalTraits.hangouts || '',
        workedIn: personalTraits.worked_in || '',
        personalities: personalTraits.personalities || '',
        proudMoments: personalTraits.proud_moments || [],
        beliefs: personalTraits.beliefs || []
      } : undefined,

      recommendations: recommendations ? (() => {
        // Group recommendations by type
        const books = (recommendations as any[]).filter((r: any) => r.type === 'book').map((r: any) => ({
          category: r.category,
          books: r.items || []
        }));
        const movies = (recommendations as any[]).filter((r: any) => r.type === 'movie').map((r: any) => ({
          category: r.category,
          items: r.items || []
        }));
        const tvShows = (recommendations as any[]).filter((r: any) => r.type === 'tv_show').map((r: any) => ({
          category: r.category,
          items: r.items || []
        }));
        return { books, movies, tvShows };
      })() : undefined
    };

    return contentData;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

// Auth functions
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

// CRUD operations for each table
export const personalInfoQueries = {
  async update(lang: Language, data: any) {
    return await supabase
      .from('personal_info')
      .upsert({ lang, ...data }, { onConflict: 'lang' });
  }
};

export const skillsQueries = {
  async getAll(lang: Language) {
    return await supabase
      .from('skills')
      .select('*')
      .eq('lang', lang)
      .order('display_order');
  },
  async create(data: any) {
    return await supabase.from('skills').insert(data);
  },
  async update(id: string, data: any) {
    return await supabase.from('skills').update(data).eq('id', id);
  },
  async delete(id: string) {
    return await supabase.from('skills').delete().eq('id', id);
  }
};

export const experienceQueries = {
  async getAll(lang: Language) {
    return await supabase
      .from('experience')
      .select('*')
      .eq('lang', lang)
      .order('display_order');
  },
  async create(data: any) {
    return await supabase.from('experience').insert(data);
  },
  async update(id: string, data: any) {
    return await supabase.from('experience').update(data).eq('id', id);
  },
  async delete(id: string) {
    return await supabase.from('experience').delete().eq('id', id);
  }
};

export const educationQueries = {
  async getAll(lang: Language) {
    return await supabase
      .from('education')
      .select('*')
      .eq('lang', lang)
      .order('display_order');
  },
  async create(data: any) {
    return await supabase.from('education').insert(data);
  },
  async update(id: string, data: any) {
    return await supabase.from('education').update(data).eq('id', id);
  },
  async delete(id: string) {
    return await supabase.from('education').delete().eq('id', id);
  }
};

export const projectsQueries = {
  async getAll(lang: Language) {
    return await supabase
      .from('projects')
      .select('*')
      .eq('lang', lang)
      .order('display_order');
  },
  async create(data: any) {
    return await supabase.from('projects').insert(data);
  },
  async update(id: string, data: any) {
    return await supabase.from('projects').update(data).eq('id', id);
  },
  async delete(id: string) {
    return await supabase.from('projects').delete().eq('id', id);
  }
};

export const thoughtsQueries = {
  async getAll(lang: Language) {
    return await supabase
      .from('thoughts')
      .select('*')
      .eq('lang', lang)
      .order('display_order', { ascending: false });
  },
  async create(data: any) {
    return await supabase.from('thoughts').insert(data);
  },
  async update(id: string, data: any) {
    return await supabase.from('thoughts').update(data).eq('id', id);
  },
  async delete(id: string) {
    return await supabase.from('thoughts').delete().eq('id', id);
  }
};

export const activitiesQueries = {
  async getAll(lang: Language) {
    return await supabase
      .from('activities')
      .select('*')
      .eq('lang', lang)
      .order('display_order', { ascending: false });
  },
  async create(data: any) {
    return await supabase.from('activities').insert(data);
  },
  async update(id: string, data: any) {
    return await supabase.from('activities').update(data).eq('id', id);
  },
  async delete(id: string) {
    return await supabase.from('activities').delete().eq('id', id);
  }
};

export const socialsQueries = {
  async getAll(lang: Language) {
    return await supabase
      .from('socials')
      .select('*')
      .eq('lang', lang)
      .order('display_order');
  },
  async create(data: any) {
    return await supabase.from('socials').insert(data);
  },
  async update(id: string, data: any) {
    return await supabase.from('socials').update(data).eq('id', id);
  },
  async delete(id: string) {
    return await supabase.from('socials').delete().eq('id', id);
  }
};

export const consultationQueries = {
  async update(lang: Language, data: any) {
    return await supabase
      .from('consultation')
      .upsert({ lang, ...data }, { onConflict: 'lang' });
  }
};

export const navigationQueries = {
  async get(lang: Language) {
    return await supabase
      .from('navigation')
      .select('*')
      .eq('lang', lang)
      .single();
  },
  async update(lang: Language, data: any) {
    return await supabase
      .from('navigation')
      .upsert({ lang, ...data }, { onConflict: 'lang' });
  }
};

export const headersQueries = {
  async get(lang: Language) {
    return await supabase
      .from('headers')
      .select('*')
      .eq('lang', lang)
      .single();
  },
  async update(lang: Language, data: any) {
    return await supabase
      .from('headers')
      .upsert({ lang, ...data }, { onConflict: 'lang' });
  }
};

export const personalTraitsQueries = {
  async get(lang: Language) {
    return await supabase
      .from('personal_traits')
      .select('*')
      .eq('lang', lang)
      .single();
  },
  async update(lang: Language, data: any) {
    return await supabase
      .from('personal_traits')
      .upsert({ lang, ...data }, { onConflict: 'lang' });
  }
};

export const recommendationsQueries = {
  async getAll(lang: Language) {
    return await supabase
      .from('recommendations')
      .select('*')
      .eq('lang', lang)
      .order('display_order');
  },
  async create(data: any) {
    return await supabase.from('recommendations').insert(data);
  },
  async update(id: string, data: any) {
    return await supabase.from('recommendations').update(data).eq('id', id);
  },
  async delete(id: string) {
    return await supabase.from('recommendations').delete().eq('id', id);
  }
};

// Image upload to Supabase Storage
export async function uploadImage(file: File, bucket: string = 'images'): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}
