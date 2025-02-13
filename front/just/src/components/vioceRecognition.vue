<script setup>
import { ref, onMounted,onUnmounted } from 'vue'
import { useCentralStore } from '../stores/centralStore'
const store = useCentralStore()
const transcript = ref('')
const isRecording = ref(false)

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const sr = new Recognition()

let timeoutId = null;  // To store the timeout ID

onMounted(() => {
  sr.continuous = true
  sr.interimResults = true

  sr.onstart = () => {
    console.log('SR Started')
    isRecording.value = true

  }

  sr.onend = () => {
    console.log('SR Stopped')
    transcript.value = ''
    isRecording.value = false
  }

  sr.onresult = (evt) => {
    // Gather the full transcript
    let t = Array.from(evt.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')
    
    // Store the transcript
    transcript.value = t

    // Reset the timeout on each new result
    clearTimeout(timeoutId);

    // Set a new timeout for the action to be triggered after a delay
    timeoutId = setTimeout(() => {
      CheckForCommand(t);  // Call the command check after a delay
    }, 1000);  // Adjust the time as necessary (1000ms = 1 second)
  }
})

const CheckForCommand = (transcript) => {
  transcript = removeNumbers(transcript); // Clean the transcript by removing numbers
  
  // Check the command and process it
  store.filterProductsByName(transcript);
  
  // If there are items in the store, stop the recognition
  if (store.items) {
    sr.stop()
  }
};

// Function to remove numbers from the transcript
const removeNumbers = (input) => {
  return input.replace(/[0-9]/g, ''); // Remove any numbers from the transcript
}
const ToggleMic = () => {
  if (isRecording.value) {
    sr.stop()
  } else {
    sr.start()
  }
}

const shiftPressed = ref(false);

// Function to handle the keydown event
const handleKeydown = (event) => {
  if (event.shiftKey) {
    shiftPressed.value = true;
    ToggleMic()
}
};

// Function to handle the keyup event (optional)
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
// const ToggleMic = () =>{
//     if(shiftPressed){
//         sr.stop()
//     }
//     else{
//         store.stop()
//     }
// }
// Clean up event listeners on unmount
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('keyup', handleKeyup);
});

</script>

<template>
  <div class="container" v-if="isRecording">
    <div class="transcript" v-text="transcript" ></div>
  </div>
</template>

<style scoped>
.container{
    position: absolute;
    top: 0;
    left: 0;
    width: 250px;
    height: 30px;
    background-color: rgba(49, 45, 45, 0.432);
}
</style>
