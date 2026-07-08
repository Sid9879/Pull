const Disease = require("../models/Disease");

const diseasesData = require("../data/diseases");


exports.bulkInsertDiseases = async (
  req,
  res
) => {

  try {

    const existingDiseases =
      await Disease.find();

    if (existingDiseases.length > 0) {

      return res.json({
        success: false,
        message:
          "Diseases already inserted"
      });
    }

    await Disease.insertMany(
      diseasesData
    );

    return res.json({
      success: true,
      message:
        "Diseases inserted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


exports.getAllDiseases = async (
  req,
  res
) => {

  try {

    const diseases =
      await Disease.find()
        .select("name");

    return res.json({
      success: true,
      diseases
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// exports.searchDiseases = async (
//   req,
//   res
// ) => {

//   try {

//     const query =
//       req.query.query || "";

//     const diseases =
//       await Disease.find({
//         name: {
//           $regex: query,
//           $options: "i"
//         }
//       }).select("name");

//     return res.json({
//       success: true,
//       suggestions: diseases
//     });

//   } catch (error) {

//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

exports.searchDiseases = async (
  req,
  res
) => {

  try {

    const query =
      req.query.query
        ?.toLowerCase()
        .trim() || "";

 

    if (!query) {

      return res.json({
        success: true,
        type: "empty",
        suggestions: [],
        message:
          "Start typing a disease name..."
      });
    }



    const greetings = [
      "hi",
      "hello",
      "hey",
      "hii",
      "helo"
    ];

    if (greetings.includes(query)) {

      return res.json({
        success: true,
        type: "greeting",
        message:
          "Hello 👋 Please search for a disease like fever, dengue, malaria etc."
      });
    }



    if (query.length < 2) {

      return res.json({
        success: true,
        type: "short",
        suggestions: [],
        message:
          "Please type at least 2 characters."
      });
    }



    const diseases =
      await Disease.find({
        name: {
          $regex: query,
          $options: "i"
        }
      })
      .select("name")
      .limit(10);



    if (!diseases.length) {

      return res.json({
        success: true,
        type: "not_found",
        suggestions: [],
        message:
          "No matching disease found."
      });
    }



    return res.json({
      success: true,
      type: "success",
      suggestions: diseases
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getDiseaseDetails =
  async (req, res) => {

    try {

      const disease =
        await Disease.findOne({
          name: req.params.name
            .toLowerCase()
        });

      if (!disease) {

        return res.status(404).json({
          success: false,
          message:
            "Disease not found"
        });
      }

      return res.json({
        success: true,

        caution:
          "⚠️ Please consult with your doctor before taking any medicine.",

        disease
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
