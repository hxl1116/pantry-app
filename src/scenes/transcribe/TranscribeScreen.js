import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import Sound from "react-native-sound";
import AudioRecord from "react-native-audio-record";
import { Button, Colors, IconButton } from "react-native-paper";

import {
  checkPermission,
  chunkArray,
  downloadTranscription,
  transcribeFile,
  uploadFile,
} from "../../utils/transcribe.utils";
import transcribeStyles from "../../styles/transcribe.styles";
import Loading from "../../components/atoms/Loading";
import TranscribeResult from "../../components/molecules/TranscribeResult";
import { addTranscribedItems } from "../../utils/db.utils";

const TranscribeScreen = () => {
  // TODO: Add job progress state
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState({
    fileId: "",
    audioFile: "",
    sound: null,
    loaded: false,
  });

  const [playback, setPlayback] = useState({
    paused: true,
    recording: false,
  });

  const [iconState, setIconState] = useState({
    icon: "microphone",
    color: Colors.black,
  });

  // Initializes AudioRecord
  // TODO: Migrate to transcribe.utils.js
  useEffect(async () => {
    await checkPermission();

    AudioRecord.init({ sampleRate: 32000, wavFile: "test.wav" });

    AudioRecord.on("data", data => {
      const chunk = Buffer.from(data, "base64");
      chunkArray.push(chunk);
    });
  }, []);

  useEffect(() => {
    if (transcript) setLoading(false);
  }, [transcript]);

  // Determines action based on icon state
  // TODO: Migrate to transcribe.utils.js
  const handlePlayback = async () => {
    switch (iconState.icon) {
      case "microphone":
        start();
        break;
      case "stop":
        await stop();
        break;
      case "play":
        await play();
        break;
      case "pause":
        pause();
        break;
    }
  };

  // Starts recording
  // TODO: Migrate to transcribe.utils.js
  const start = () => {
    console.log("Recording...");

    setPlayback(prev => ({ ...prev, recording: true }));
    setIconState(prev => ({ ...prev, icon: "stop", color: Colors.red400 }));

    AudioRecord.start();
  };

  // Stops recording
  // TODO: Migrate to transcribe.utils.js
  const stop = async () => {
    if (playback.recording) {
      setPlayback(prev => ({ ...prev, recording: false }));
      setLoading(true);

      // Stop recording
      let audioFile = await AudioRecord.stop();

      // Transcribe tries to start before .wav finishes uploading
      let fileId = await uploadFile(audioFile);

      await transcribeFile(fileId);

      await downloadTranscription(fileId,
        (transcript) => setTranscript(transcript));

      let sound = new Sound(audioFile);

      setAudio(prev => ({
        ...prev,
        audioFile: audioFile,
        fileId: fileId,
        sound: sound,
        loaded: true,
      }));

      setIconState(prev => ({ ...prev, icon: "play", color: Colors.green400 }));
    }
  };

  // Starts playback
  // TODO: Migrate to transcribe.utils.js
  const play = async () => {
    setPlayback(prev => ({ ...prev, paused: false }));

    Sound.setCategory("Playback");

    setIconState(prev => ({ ...prev, icon: "pause", color: Colors.amber400 }));

    audio.sound.play(success => {
      console.log(success ?
        "Finished playing successfully" :
        "Playback failed: failed decoding audio");

      setPlayback(prev => ({ ...prev, paused: true }));
      setIconState(prev => ({ ...prev, icon: "play", color: Colors.green400 }));
    });
  };

  // Stops playback
  // TODO: Migrate to transcribe.utils.js
  const pause = () => {
    audio.sound.pause();
    setPlayback(prev => ({ ...prev, paused: true }));
    setIconState(prev => ({ ...prev, icon: "play", color: Colors.green400 }));
  };

  /**
   * TODO: Add snackbar status for adding transcribed items,
   *  add progress bar with status text,
   *  convert playback controls to FAB Group
   */
  return (
    <SafeAreaView style={transcribeStyles.transcribeWrapper}>
      {loading && (
        <Loading />
      )}
      {transcript !== "" && (
        <FlatList
          style={transcribeStyles.resultsWrapper}
          data={transcript.split(" ")}
          renderItem={({ item }) => (
            <TranscribeResult transcript={item} />
          )}
          keyExtractor={(item, index) => `transcript-item-${index}`}
          ListFooterComponent={(
            <Button
              style={transcribeStyles.addItemsButton}
              mode="outlined"
              onPress={() => {
                // TODO: Trigger snackbar on add items
                addTranscribedItems(transcript.split(" "));
              }}
            >
              add items
            </Button>
          )}
        />
      )}
      <View style={transcribeStyles.playbackWrapper}>
        <IconButton
          style={transcribeStyles.playbackIcon}
          icon={iconState.icon}
          color={iconState.color}
          size={50}
          animated={true}
          onPress={() => handlePlayback()}
        />
      </View>
    </SafeAreaView>
  );
};

export default TranscribeScreen;
