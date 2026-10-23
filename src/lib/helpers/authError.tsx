const getLoginErrorMessage = (error: any): string => {
  const code = error?.code;
  switch (code) {
    // Email related
    case 'auth/invalid-email':
      return 'আপনার ইমেইল ঠিকানাটি সঠিক নয়।';

    case 'auth/user-not-found':
      return 'এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি।';

    // Password / credential related
    case 'auth/wrong-password':
      return 'আপনার পাসওয়ার্ড সঠিক নয়।';

    case 'auth/invalid-credential':
      return 'ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।';

    case 'auth/user-disabled':
      return 'আপনার অ্যাকাউন্টটি বন্ধ রয়েছে।';

    // Internet / network related
    case 'auth/network-request-failed':
      return 'ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।';

    // Too many attempts
    case 'auth/too-many-requests':
      return 'অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।';

    // Firebase configuration / server related
    case 'auth/operation-not-allowed':
      return 'এই Login পদ্ধতিটি বর্তমানে চালু নেই।';

    case 'auth/invalid-api-key':
      return 'Firebase configuration-এ সমস্যা হয়েছে।';

    default:
      console.log('Unknown Firebase Auth Error:', error);

      return 'Login করা যায়নি। আবার চেষ্টা করুন।';
  }
};

export default getLoginErrorMessage;
