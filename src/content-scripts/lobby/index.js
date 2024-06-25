import { autoAceitarReady, autoAceitarReadySetInterval } from './autoAceitarReady';
import { autoConcordarTermosRanked } from './autoConcordarTermosRanked';
import { autoFixarMenuLobby } from './autoFixarMenuLobby';
import { adicionarBotaoAutoComplete } from './botaoAutoComplete';
import { adicionarBotaoForcarCriarLobby } from './botaoForcarCriarLobby';
import { initListaBloqueio } from './botaoListaBloqueio';
import { listaBloqueio } from './listaBloqueio';
import { lobbyLink } from './lobbyLink';
import { mostrarKdr, mostrarKdrRanked, mostrarKdrSala } from './mostrarKdr';
import { partidaInfo } from './partidaInfo';
import { somReady } from './somReady';
// import { adicionarFiltroKdr } from './filtrarKdr';
import { infoChallenge, infoLobby } from './infoLobby';

import { ocultarNotificacaoComplete } from './ocultarNotificacaoComplete';
import { ocultarSugestaoDeLobbies } from './ocultarSugestaoDeLobbies';
import { tocarSomSeVoceForExpulsoDaLobby } from './tocarSomSeVoceForExpulsoDaLobby';


chrome.storage.sync.get( null, function ( _result ) {
  if ( window.location.pathname.includes( 'partida' ) || window.location.pathname.includes( '/match/' ) ) {
    initLobbyPartida();
  } else {
    initLobby();
  }
} );

const initLobbyPartida = async () => {
  initListaBloqueio();
};

const initLobby = async () => {
  criarObserver( '.lobby,.ranking', somReady );
  criarObserver( '.lobby,.ranking', autoAceitarReady );
  criarObserver( '.lobby,.ranking', autoConcordarTermosRanked );

  criarObserver( '#lobbyContent', autoFixarMenuLobby );
  criarObserver( '#lobbyContent', lobbyLink );
  criarObserver( '#lobbyContent', listaBloqueio );
  criarObserver( '#lobbyContent', mostrarKdrSala );

  criarObserver( '#lobbies-wrapper', mostrarKdr );
  criarObserver( '#lobbies-wrapper', infoLobby );
  criarObserver( '#challengeList', infoChallenge );
  criarObserver( '#challengeList', mostrarKdr );
  criarObserver( '#GamersClubCSApp-globals-globalToaster', tocarSomSeVoceForExpulsoDaLobby );

  // Esconde a sugestão de lobbies para entrar
  ocultarSugestaoDeLobbies();

  //  Oculta as notificações de complete
  ocultarNotificacaoComplete();

  // Clicar automáticamente no Ready, temporário.
  autoAceitarReadySetInterval();
  // Feature para aceitar complete automatico
  adicionarBotaoAutoComplete();
  // Feature pra criar lobby caso full
  adicionarBotaoForcarCriarLobby();
  // Feature para mostrar kdr dos players
  mostrarKdr();
  mostrarKdrRanked();
  // Feature para filtrar por KD
  // adicionarFiltroKdr();
  // Feature de discord na hora de copiar o ip
  partidaInfo();
};

const criarObserver = ( seletor, exec ) => {
  if ( $( seletor ).length > 0 ) {
    const observer = new MutationObserver( mutations => {
      exec( mutations );
    } );
    observer.observe( $( seletor ).get( 0 ), {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    } );
  }
};
