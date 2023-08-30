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
          Authorization: `Bearer sl.BlEhVGWYq_u9x6p8-GlDHcm9qqduWGirQbmmgEOn4fo0rbT5nkRE17sT_Oft7LGChbcxOaMwHfmyFwERyTgzaEEEdS7S7PM3ZC-bvNGlhcJJIsT9neZZPNeIvHt8iM54r6sLe24m4wdk3vzFItPx`,
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
