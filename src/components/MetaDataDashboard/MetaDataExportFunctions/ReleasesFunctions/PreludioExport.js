import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

class PreludioExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     csvData: []
   }

  // ******************************************************************************************
  //  PRELUDIO RELEASE EXPORT FUNCTION
  // ******************************************************************************************

  //  seems finished, double check and run through diffChecker


  preludioExport = () => {
    this.props.resetDownload();
    this.props.downloadCompletedChecker();
    let progressCount = 0;
    let isBG =  this.props.selectedLibrary.libraryName === 'background-instrumentals' ? true : false;

    let headersRow = [
      'ISRC code',	'Internal code Preludio',	'Title',	'Length',	'File name',	'Category',	'Rights',	'Master Label',
      'Editability',	'Download',	'Keywords',	'Private Keywords',	'Description',	'Description ENGLISH',	'Lyrics',
      'Note',	'Atmospheres',	'Genres',	'Products',	'Rhythm',	'Orchestration',	'Publisher',	'Authors and Composers',
      'Artist',	'ALBUM catalogue number & tracks'
    ];
    this.setState({csvData: [headersRow.join('\t')]})
    let releasesArray = isNaN(this.props.releaseFilter.value) && this.props.releaseFilter.value.includes('-') ? this.props.releaseFilter.value.split('-') : [];
    let filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
      releasesArray.length !== 0
        ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && (cue.cue_status !== 'Pulled' && cue.cue_status !== 'Pending')
        : cue.rel_id === this.props.releaseFilter.value && (cue.cue_status !== 'Pulled' || 'Pending')
     )
     exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
       progressCount ++;
    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).sort().join(', ');
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).sort().join(' | ');
      let genre = this.props.selectedCategories.filter(categories =>
         categories.cat_id === row.cat_id).map(cat =>
           cat.cat_name);

      let subGenre = this.props.selectedStyles.filter(styles =>
             styles.style_id === row.style_id).map(style =>
               style.style_name);
    // --------------------------------------------------------------------------------------------------

      let composerArray = this.props.selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);

      let releaseParse = this.props.releaseFilter.label.split('R')[1];

      let compString = '';
      let splitString = '';
      let pubString = '';
      let caeString = '';
      let proString = '';
      for(let c in composerArray){
        pubString += isBG ? composerArray[c].publisher_name.split(' (')[0] : composerArray[c].publisher_name
        pubString += c < composerArray.length - 1 ? ' | ' : '';
        compString += `${composerArray[c].first} ${composerArray[c].middle ? composerArray[c].middle + ' ' : ''}${composerArray[c].last}`;
        compString += c < composerArray.length - 1 ? ' | ' : '';
        splitString += composerArray[c].composer_split
        splitString += c < composerArray.length - 1 ? ' | ' : '';
        caeString += composerArray[c].cae;
        caeString += c < composerArray.length - 1 ? ' | ' : '';
        proString += composerArray[c].pro_name;
        proString += c < composerArray.length - 1 ? ' | ' : '';
      }

      let newRow = [
        // ISRC code
        isBG
          ? `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`
          : '',
        // Internal code Preludio
        '',
        // Title
        row.cue_title,
        // Length
        `${row.cue_duration.split(':')[0].toString().padStart(2, 0)}:${row.cue_duration.split(':')[1]}`,
        // File name
        `DLM - ${row.cue_title}.mp3`,
        // Category
        '',
        // Rights
        '',
        // Master Label
        isBG ? 'DL Music - Background Instrumentals' : 'DL Music - Indie Artists',
        // Editability
        'No',
        // Download
        '',
        // Keywords
        descriptionString,
        // Private Keywords
        '',
        // Description
        '',
        // Description ENGLISH
        `${genre}, ${subGenre}`,
        // Lyrics
        '',
        // Note
        '',
        // Atmospheres
        this.atmosphereParse(row),
        // Genres
        isBG ? this.genreBIParse(row) : this.genreIAParse(row),
        // Products
        isBG ? this.productBIParse(row) : this.productIAParse(row),
        // Rhythm
        row.tempo_id === 8 ? this.props.tempos.filter(tempo =>
          tempo.tempo_id === row.tempo_id)[0].tempo_name : '',
        // Orchestration
        instrumentsString,
        // Publisher
        pubString,
        // Authors and Composers
        compString,
        // Artist
        isBG ? compString.replace(' | ', ', ') : row.artist_name,
        // ALBUM catalogue number & tracks
        isBG? `DLM ${row.style_id.toString().padStart(3, 0)}: ${row.cue_id}` : `IA ${row.style_id.toString().padStart(3, 0)}: ${row.cue_id}`
       ]
       // console.log(newRow)
       let progress = (progressCount/filteredLibrary.length)
       this.setState({csvData: [...this.state.csvData, newRow.join('\t')], progress})
     }, () => { // inProgress()
       this.props.updateDownload(this.state.progress)
     },
     () => { // done()
       this.props.updateDownload(1)
       this.props.downloadCompletedChecker();
       exportTools.generateDownload(this.state.csvData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}PRELUDIO_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
     })
   }

  productBIParse = (row) => {
	  if (row.cat_id === 1){
  		return "TV Break / Bumpers"; // BUMPERS TRANSITIONS & SCORE TOOLS
		} else if (row.style_id === 16){
			return "Ambient Music"; // DANCE: AMBIENT - DOWN TEMPO
		} else if (row.cat_id === 4){
      return "Soundtracks"; // DRAMA ORCHESTRAL
    } else if (row.style_id === 78){
  		return "Cartoon | Kids"; // SPECIALTY: GOOFY COMEDIC KIDS
		}	else {
      return '';
    }
  }

  genreBIParse = (row) => {
    if (row.style_id === 16){
			return "Electronic | Ambient | Chillout";   // DANCE: AMBIENT - DOWN TEMPO
		} else if (row.style_id === 17){
			return "Electronic | Beat"; // DANCE: BREAKS
		} else if (row.style_id === 18){
			return "Electronic | Pop"; // DANCE: DANCE POP
		} else if (row.style_id === 19){
			return "Disco-Dance"; // DANCE: DISCO
		} else if (row.style_id === 20 || row.style_id === 4){
  		return "Electronic"; // DANCE: ELECTRONICA // BUMPS TRANSITIONS: ELECTRONIC
		} else if (row.style_id === 21){
  		return "Electronic | House"; // DANCE: HOUSE
		} else if (row.style_id === 22){
  		return "Electronic | Trance | Techno"; // DANCE: Nrg (rave-trance-techno)
		} else if (row.style_id === 23){
  		return "Electronic"; // DANCE: Retro
		} else if (row.style_id === 35){
			return "Modern piano"; // DRAMA: SOLO INSTRUMENTS: PIANO
		} else if (row.cat_id === 4){
  		return "Cinematic"; // DRAMA ORCHESTRAL
		} else if (row.style_id === 45){
  		return "Hip-Hop"; // HIPHOP - RNB: Gangsta - Playa - Pimp
		} else if (row.style_id === 46){
  		return "Hip-Hop"; // HIPHOP - RNB: Hip-Hop
		} else if (row.style_id === 47){
  		return "Hip-Hop"; // HIPHOP - RNB: Ol Skool
		} else if (row.style_id === 48){
  		return "R&B"; // HIPHOP - RNB: RnB - Soft
		} else if (row.style_id === 49){
      return "Trip-hop"; // HIPHOP - RNB: Trip-hop
		} else if (row.style_id === 54){
      return "Jazz"; // JAZZ - BIG BAND - LARGE ENSEMBLE
		} else if (row.style_id === 55){
      return "Jazz | Rock"; // JAZZ - JAZZ ROCK
		} else if (row.style_id === 56 || row.style_id === 73 || row.style_id === 6){
      return "Jazz"; // JAZZ - QUARTET - SMALL ENSEMBLE // SCORE TOOLS: JAZZY // BUMPS TRANSITIONS: JAZZ
		} else if (row.style_id === 57){
      return "Smooth Jazz | Jazz | Easy Listening"; // JAZZ - SMOOTH JAZZ
		} else if (row.style_id === 57){
      return "Jazz | Easy Listening"; // JAZZ - SOLO JAZZ INSTS
		} else if (row.style_id === 65){
      return "Blues"; // ROCK BLUES FUNK: BLUES
		} else if (row.style_id === 56){
      return "Industrial";   // ROCK BLUES FUNK: Edgy - Industrial
		} else if (row.style_id === 67){
      return "Funky"; // ROCK BLUES FUNK: Funk
		} else if (row.style_id === 68){
      return "Heavy Rock"; // ROCK BLUES FUNK: Heavy Rock
		} else if (row.style_id === 69 || row.style_id === 70){
      return "Pop | Rock"; // ROCK BLUES FUNK: Pop Rock // SCORE TOOLS: ROCK - POP
		} else if (row.style_id === 59){
  		return "Reggae | Ska"; // REGGAE- SKA - REGGAE-SKA
		} else if (row.style_id === 76){
  		return "Techno | Electronic";   // SCORE TOOLS: TECHNO - ELECTRONICA
		} else if (row.style_id === 126 || row.style_id === 14){
  		return "Urban"; // SCORE TOOLS: URBAN // BUMPS TRANSITIONS: URBAN
		} else if (row.style_id === 77){
  		return "Country"; // SPECIALTY: COUNTRY - AMERICANA
		} else if (row.style_id === 78){
  		return "Comedy Film | Children's Music"; // SPECIALTY: GOOFY COMEDIC KIDS
		} else if (row.style_id === 142){
  		return "Country | Hip-Hop";   // SPECIALTY: HICK HOP
		} else if (row.style_id === 82){
  		return "Sacred Music"; // SPECIALTY: SPIRITUAL
		} else if (row.style_id === 84){
  		 return "Pop | Urban"; //	VOCAL TRAX: DANCE - URBAN
		} else if (row.style_id === 85){
  		return "Rock | Blues"; //	VOCAL TRAX: ROCK - BLUES
		} else if (row.style_id === 128 || row.style_id === 15){
  		return "World";   //	VOCAL TRAX: WORLD // BUMPS TRANSITIONS: WORLD
		} else if (row.cat_id === 14){
  		return "World | Ethnic"; // WORLD MUSIC
		} else if (row.cat_id === 15){
  		return "World | Pop";// WORLD POP
		} else {
      return '';
    }
  }

  genreIAParse = (row) => {
  	if (row.style_id === 24 || row.style_id === 71){
		    return "Bluegrass"; // COUNTRY: BLUE GRASS
		} else if (row.style_id === 15 || row.style_id === 68){
		    return "Country";   // COUNTRY: TRADITIONAL COUNTRY
		} else if (row.style_id === 18 || row.style_id === 32){
		    return "Pop | Electronic";   // DANCE: DANCE POP
		} else if (row.style_id === 25 || row.style_id === 41){
		    return "Sacred Music";   // HOLIDAYS: XMAS SONGS
		} else if (row.style_id === 52 || row.style_id === 56){
		    return "Pop";   // POP: ACOUSTIC POP
		} else if (row.style_id === 19 || row.style_id === 40){
		    return "Pop | Contemporary"; // POP: ADULT CONTEMPORARY
		} else if (row.style_id === 54 || row.style_id === 57){
		    return "Pop";   // POP: BUGGLEGUM
		} else if (row.style_id === 2 || row.style_id === 35){
		    return "Pop";   // POP: FEMALE POP VOCALS
    } else if (row.style_id === 53 || row.style_id === 58){
		    return "Folk | Indie Rock";     // POP: INDIE FOLK
		} else if (row.style_id === 8 || row.style_id === 42){
		    return "Pop";   // POP: MALE POP VOCALS
		} else if (row.style_id === 20 || row.style_id === 44){
		    return "Pop";   // POP: MODERN RETRO
		} else if (row.style_id === 21 || row.style_id === 36){
		    return "Pop | Country";   // POP: POP COUNTRY CROSSOVER
		} else if (row.style_id === 48){
		    return "Movie Soundtrack | Cinematic";   // RETRO: SCORE
		} else if (row.style_id === 28 || row.style_id === 45){
		    return "Rock | Rock'n'roll";   // ROCK: 50's ROCK
    } else if (row.style_id === 5 || row.style_id === 37){
		    return "Blues | Rock";     // ROCK: BLUES
		} else if (row.style_id === 65){
		    return "Rock | Heavy Rock | Punk";   // ROCK: GRUNGE
    } else if (row.style_id === 11 || row.style_id === 34){
		    return "Indie Rock | Alternative | Rock";     // ROCK: INDIE- ALTERNATIVE
		} else if (row.style_id === 22 || row.style_id === 38){
		    return "Heavy Rock | Rock | Contemporary";   // ROCK: MODERN - HEAVY ROCK
    } else if (row.style_id === 6 || row.style_id === 39){
		    return "Rock | Pop";     // ROCK: POP ROCK
		}	else if (row.style_id === 17){
		    return "Punk | Rock";   // ROCK: PUNK ROCK
		} else if (row.style_id === 29 || row.style_id === 46){
		    return "Reggae | Ska";   // ROCK: REGGAE - SKA
		} else if (row.style_id === 27 || row.style_id === 43){
		    return "Rockabilly | Rock";   // ROCK: ROCKABILLY
		} else if (row.style_id === 4 || row.style_id === 31){
		    return "Contemporary | Pop";   // SINGER SONGWRITER: MALE VOCALS
		} else if (row.style_id === 50 || row.style_id === 59){
		    return "Contemporary | Pop";   // SINGER SONGWRITER: SINGER SONGWRWITER
		} else if (row.style_id === 62 || row.style_id === 64){
		    return "Electronic | Urban";   // URBAN: ELECTRONIC
		} else if (row.style_id === 10 || row.style_id === 69){
		    return "Funky | Soul | Urban";  // URBAN: FUNK - SOUL
		} else if (row.style_id === 61 || row.style_id === 63){
		    return "Soul | Contemporary | Urban";   // URBAN: NEO - SOUL
		} else if (row.style_id === 14 || row.style_id === 66){
		    return "Rap | Hip-Hop | Urban";   // URBAN: RAP - HIP HOP
		} else if (row.style_id === 9 || row.style_id === 70){
		    return "R&B | Urban";    // URBAN: R&B
		} else if (row.style_id === 55){
		    return "Irish | World";   // WORLD: IRISH
		} else if (row.style_id === 51 || row.style_id === 60){
		    return "Latin | World";   // WORLD: LATIN
		} else if (row.style_id === 16){
		    return "World | Fusion | Ethnic";   // WORLD: WORLD BEAT
		}
  }
    productIAParse = (row) => {
      if (row.style_id === 18 || row.style_id === 32){
        return "Alcoholic drinks"; // DANCE: DANCE POP
      } else if (row.style_id === 25 || row.style_id === 41){
        return "Kids"; // HOLIDAYS: XMAS SONGS
      } else if (row.style_id === 54 || row.style_id === 57){
        return "Kids"; // POP: BUGGLEGUM
      } else {
        return '';
      }
    }


  atmosphereParse = (row) => {
    // console.log(240, row.cue_desc)
    let atmosphereArray = [ "90s", "action", "adventurous", "aggressive", "anxious", "calm", "carefree", "cheerful", "christmas", "comic", "cool", "crazy", "dark", "disquieting", "dramatic", "dreamy", "emotional", "energetic", "epic", "erotic", "evocative", "exciting", "exotic", "fantasy", "fashion", "funny", "gipsy", "green", "gripping", "happy", "heroic", "historical", "homey", "horror", "hypnotic", "hysteric", "involving", "magnetic", "melancholy", "modern", "motivational", "mysterious", "mystic", "nocturnal", "optimistic", "pastoral", "peaceful", "playful", "positive", "quiet", "rarefied", "regal", "relaxing", "retro", "romantic", "sad", "sci-fi", "sensual", "solemn", "sophisticated", "summer", "suspense", "tension", "thriller",
    "tribal"]
    let atmospheres = '';
    if (row.style_id === 62){
  		atmospheres += '50s | 60s';
    } else if (row.style_id === 63){
  		atmospheres += '70s';
		} else if (row.style_id === 64){
    	atmospheres += '80s';
		}
    const intersection = atmosphereArray.filter(element => row.cue_desc.split(', ').includes(element));
    // console.log(252, intersection.join(', '))
    atmospheres += atmospheres !== '' ? ` | ${exportTools.parseData(intersection.join(', ')).join(' | ')}` : exportTools.parseData(intersection.join(', ')).join(' | ');
    return atmospheres.substring(atmospheres.length - 3, 3) === ' | ' ? atmospheres.substring(0, atmospheres.length - 3) : atmospheres;
    console.log(atmospheres)
    return atmospheres;
  }

  render(){
    let releaseFilter = this.props.releaseFilter;
    return (
      <a onClick={(() =>
        releaseFilter === 147
          ? exportTools.exportError('Please Select A Release To Export')
          : this.props.inclusive || releaseFilter.label === 'All'
          ? exportTools.exportError('We Typically Only Send Preludio One Release At A Time. Please Unselect All/Inclusive.')
          : releaseFilter.label.includes('_')
          ? exportTools.exportError('We Typically Only Send Preludio Releases. Please Select A Releases.')
          : this.preludioExport())
        } className={
          this.props.inclusive || releaseFilter === 147 ||
          (releaseFilter.label && (releaseFilter.label === 'All' || releaseFilter.label.includes('_')))
            ? 'strikethrough'
            : 'download-links'
          }>
        {`Preludio Release Export ${
          this.props.inclusive || releaseFilter === 147 ||
          (releaseFilter.label && (releaseFilter.label === 'All' || releaseFilter.label.includes('_')))
            ? ''
            : releaseFilter.label
        }`
      }
    </a>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    downloadProgress: state.downloadProgress
  };
}

const mapDispatchToProps = {
  resetDownload,
  updateDownload
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PreludioExport));
