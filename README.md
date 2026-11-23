# App Captura de Vídeo

Aplicativo mobile desenvolvido em **React Native** com **TypeScript** e **Expo** para gravação de vídeos com áudio, alternância entre câmera traseira e frontal, reprodução imediata e ações de compartilhamento, salvamento na galeria ou descarte no **Android**.

---

## O que foi feito

- **Gravação de vídeo com áudio:** Inicia e encerra a gravação pela câmera do aparelho (limite de até 60 segundos por gravação).
- **Alternância de câmera:** Botão para alternar entre câmera traseira (`back`) e frontal (`front`) antes de iniciar a gravação.
- **Reprodução pós-gravação:** Exibição automática do vídeo gravado em loop com controles nativos de reprodução.
- **Ações com o vídeo gravado:**
  - **Compartilhar:** Abre o menu nativo de compartilhamento do sistema.
  - **Salvar:** Salva o vídeo na galeria do celular e exibe um alerta visual confirmando o salvamento.
  - **Descartar:** Descarta o vídeo atual e retorna imediatamente para a tela da câmera.
- **Interface adaptada ao Android:** Telas internas configuradas com fundo escuro (`#000000`), botões traduzidos para o português e barra de ações posicionada acima da área de navegação inferior do Android.

---

## Tecnologias Utilizadas

- **React Native**
- **TypeScript**
- **Expo (SDK 58)**
- **expo-camera** (captura de vídeo e controle de câmera frontal/traseira)
- **expo-video** (reprodução de vídeo com controles nativos)
- **expo-media-library** (permissão e salvamento de vídeos na galeria)
- **expo-sharing** (compartilhamento nativo do arquivo de vídeo)

---

## Atualizações Realizadas para Rodar no Android (Migração de Versão Antiga)

A base original do projeto utilizava APIs antigas do ecossistema Expo que não funcionam nas versões atuais do Expo Go no **Android**. Para tornar o projeto compatível e funcional, foram feitas as seguintes atualizações:

### 1. Migração da API de Câmera (`expo-camera`)
- Substituição do componente antigo `Camera` pelo **`CameraView`** com `mode="video"` e controle de direção (`facing`).
- Atualização do fluxo de permissões para os hooks **`useCameraPermissions()`** e **`useMicrophonePermissions()`**, substituindo os métodos estáticos legados (`Camera.requestCameraPermissionsAsync()`).
- Ajuste da referência da câmera (`useRef`) e dos métodos `recordAsync()` e `stopRecording()` para o ciclo atual de gravação.

### 2. Substituição do Player de Vídeo (`expo-av` → `expo-video`)
- Remoção do componente legado `Video` do `expo-av` e adoção do **`expo-video`**, utilizando **`useVideoPlayer`** e **`VideoView`** com `nativeControls` e atualização segura da URI (`player.replace(uri)`).

### 3. Ajuste de Permissão de Mídia no Android (`expo-media-library`)
- Correção do erro de permissão de mídia/áudio no Android por meio de **`MediaLibrary.usePermissions({ writeOnly: true })`**, solicitando apenas permissão de escrita para salvar o vídeo na galeria com `MediaLibrary.saveToLibraryAsync()`.

### 4. Correção de Layout e Navegação no Android
- Ajuste de espaçamento inferior (`paddingBottom`) na tela do player para impedir que os botões **Compartilhar**, **Salvar** e **Descartar** ficassem sobrepostos pela barra de navegação do Android (voltar, home e recentes).
- Padronização das telas de carregamento, permissões e containers principais no `App.tsx` com fundo escuro (`#000000`).

---

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone [https://github.com/HigorCamposGit/App-Captura-de-Video.git](https://github.com/HigorCamposGit/App-Captura-de-Video.git)
