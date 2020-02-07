export interface Oscars {
    nominees: Nominees;
  }
  export interface Nominee {
    id: string;
    isDisabled: boolean;
    isExpanded: boolean;
    result ? : (ResultEntity)[] | null;
    category_name: string;
    order: number;
  }
  export interface Nominees {
    id: string;
    bestpicture: Nominee;
    actorinaleadingrole: Nominee;
    actressinaleadingrole: Nominee;
    actorinasupportingrole: Nominee;
    actressinasupportingrole: Nominee;
    animatedfeaturefilm: Nominee;
    cinematography: Nominee;
    costumedesign: Nominee;
    directing: Nominee;
    documentaryfeature: Nominee;
    documentaryshort: Nominee;
    filmediting: Nominee;
    internationalfeaturefilm: Nominee;
    makeupandhairstyling: Nominee;
    musicoriginalscore: Nominee;
    musicoriginalsong: Nominee;
    productiondesign: Nominee;
    shortfilmanimated: Nominee;
    shortfilmliveaction: Nominee;
    soundediting: Nominee;
    soundmixing: Nominee;
    visualeffects: Nominee;
    writingadaptedscreenplay: Nominee;
    writingoriginalscreenplay: Nominee;
  }
  
  
  export interface ResultEntity {
    tmdb_id: number;
    featured_image: FeaturedImage;
    nominee_category_dict ? : (NomineeCategoryDictEntity)[] | null;
    nominee_description: string;
    nomination_year: number;
    headline: string;
    link: string;
    post_date: string;
    post_modified: string;
    post_name: string;
    post_title: string;
    post_type: string;
    winner: boolean;
    winner_img ? : null;
    video ? : (null)[] | null;
  }
  
  export interface FeaturedImage {
    sizes: Sizes;
  }
  export interface Sizes {
    featured: Featured;
  }
  export interface Featured {
    url: string;
  }
  export interface NomineeCategoryDictEntity {
    slug: string;
    name: string;
    order: number;
  }
  