const validateOnboardingSubmission = (req, res, next) => {
  const {
    name,
    age,
    datingGoal,
    currentMatches,
    bodyType,
    stylePreference,
    email,
    interests
  } = req.body;

  // Check required fields
  if (!name || !age || !datingGoal || !currentMatches || !bodyType || !stylePreference || !email) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['name', 'age', 'datingGoal', 'currentMatches', 'bodyType', 'stylePreference', 'email']
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }

  // Handle interests - could be array (JSON) or string (FormData)
  let interestsArray;
  if (typeof interests === 'string') {
    try {
      interestsArray = JSON.parse(interests);
    } catch (error) {
      return res.status(400).json({
        error: 'Invalid interests format'
      });
    }
  } else {
    interestsArray = interests;
  }

  // Validate interests array
  if (!interestsArray || !Array.isArray(interestsArray) || interestsArray.length !== 3) {
    return res.status(400).json({
      error: 'Exactly 3 interests must be selected'
    });
  }

  // Validate age
  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
    return res.status(400).json({
      error: 'Age must be between 18 and 100'
    });
  }

  // Validate dating goal
  const validDatingGoals = ['casual', 'relationship', 'marriage', 'hookup'];
  if (!validDatingGoals.includes(datingGoal)) {
    return res.status(400).json({
      error: 'Invalid dating goal'
    });
  }

  // Validate current matches
  const validMatches = ['0-2', '3-5', '5-10', '10+'];
  if (!validMatches.includes(currentMatches)) {
    return res.status(400).json({
      error: 'Invalid current matches selection'
    });
  }

  // Validate body type
  const validBodyTypes = ['slim', 'athletic', 'average', 'plus'];
  if (!validBodyTypes.includes(bodyType)) {
    return res.status(400).json({
      error: 'Invalid body type'
    });
  }

  // Validate style preference
  const validStyles = ['professional', 'casual', 'adventurous', 'party'];
  if (!validStyles.includes(stylePreference)) {
    return res.status(400).json({
      error: 'Invalid style preference'
    });
  }

  // Update req.body with parsed interests for consistency
  req.body.interests = interestsArray;

  next();
};

module.exports = {
  validateOnboardingSubmission
};
