const express = require('express');
const multer = require('multer');
const app = express();
const axios = require('axios'); // Use axios to make requests

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload-to-server', upload.single('image'), async (req, res) => {
  try {
    // Use the Dropbox API to upload the file to Dropbox
    const dropboxResponse = await axios.post(
      'https://content.dropboxapi.com/2/files/upload',
      req.file.buffer,
      {
        headers: {
          Authorization: `Bearer sl.BlFloxf7uM1zH67VyGaZ8qE2mm72nRNUd4_6pEM_4ZZSotsOIXyBgkK-H2zXPvTKBo2tZlHyd-FUNLql9YXjnxrqS-s_U0SNeekkh09QxctneDHBjCRSGcTvJZhlWy97PTiOKgpi8S-F`,
          'Dropbox-API-Arg': JSON.stringify({
            path: '/Dropbox/main/Glow_Up_Images' + req.file.originalname,
            mode: 'add',
            autorename: true,
            mute: false,
          }),
        },
      }
    );

    // You can handle the Dropbox API response here
    console.log(dropboxResponse.data);

    res.json({ message: 'File uploaded to Dropbox' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
