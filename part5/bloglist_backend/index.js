const app = require("./server");
const config = require('./config/portconfig')
const PORT = config.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


