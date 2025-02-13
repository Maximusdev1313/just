<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCentralStore } from '../stores/centralStore';
const store = useCentralStore();

const transcript = ref('');
const isRecording = ref(false);
const isSearchComplete = ref(false);  // Flag to track search completion
const searchTimeoutId = ref(null);  // To store the search timeout
const shiftPressed = ref(false);

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new Recognition();

// Timeout for stopping the recognition after 1 second
let timeoutId = null;

onMounted(() => {
  sr.continuous = true;
  sr.interimResults = true;

  sr.onstart = () => {
    console.log('SR Started');
    isRecording.value = true;
  };

  sr.onend = () => {
    console.log('SR Stopped');
    isRecording.value = false;
    resetRecognition();  // Reset recognition after it stops
  };

  sr.onresult = (evt) => {
    let t = Array.from(evt.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    // Store the transcript
    transcript.value = t;

    // Reset the timeout on each new result
    clearTimeout(timeoutId);

    // Set a new timeout for the action to be triggered after a delay
    timeoutId = setTimeout(() => {
      CheckForCommand(t);  // Check command after delay
    }, 1500);  // Adjust the delay to 1 second
  };
});

// Function to check for command and trigger search
const CheckForCommand = (transcript) => {
  if (isSearchComplete.value) {
    return;  // Prevent search from running more than once
  }

  transcript = removeNumbers(transcript);  // Remove numbers from transcript
  store.filterProductsByName(transcript);
  
  isSearchComplete.value = true;  // Mark search as complete

  // Stop recognition after search completes
  sr.stop();
  console.log('Search Complete');
};

// Function to remove numbers from the transcript
const removeNumbers = (input) => {
  return input.replace(/[0-9]/g, '');  // Remove any numbers
};

// Toggle mic on shift key press
const ToggleMic = () => {
  if (isRecording.value) {
    sr.stop();  // Stop recognition
  } else {
    sr.start();  // Start recognition
    // Set a timeout to stop after one second of recognition
    setTimeout(() => {
      sr.stop();  // Stop after 3 second of recognition
      isRecording.value = false;
    }, 4000);  // Stop recognition after 3 second
  }
};

// Function to handle keydown event
const handleKeydown = (event) => {
  if (event.shiftKey && !shiftPressed.value) {
    shiftPressed.value = true;
    ToggleMic();  // Start/stop mic when shift is pressed
  }
};

// Function to handle keyup event (optional)
const handleKeyup = (event) => {
  if (!event.shiftKey) {
    shiftPressed.value = false;
  }
};

// Add event listeners on mount
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
});

// Clean up event listeners on unmount
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('keyup', handleKeyup);
});

// Reset the search process and transcript after each search
const resetRecognition = () => {
  isSearchComplete.value = false;  // Reset the search complete flag
  transcript.value = '';  // Clear the transcript
  searchTimeoutId.value = null;  // Clear any existing search timeout
};

</script>

<template>
  <div class="container" v-if="isRecording">
    <div class="transcript" v-text="transcript"></div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 30px;
  background-color: rgba(49, 45, 45, 0.432);
}
</style>
