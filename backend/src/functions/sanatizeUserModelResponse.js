export default function sanatizeUserModelResponse(
    userData, removeUserBasicInfo = false

) {
    userData.password = undefined;
    userData._id = undefined;
    userData.__v = undefined
    userData.emailVerificationToken = undefined;
    userData.emailVerificationExpires = undefined;
    userData.resetPasswordToken = undefined;
    userData.resetPasswordExpires = undefined;
    userData.createdAt = undefined;
    userData.updatedAt = undefined;

    if (removeUserBasicInfo) {
        userData.bio = undefined;
        userData.website = undefined;
        userData.avatarUrl = undefined;
        userData.github = undefined;
        userData.linkedin = undefined;
        userData.twitter = undefined;
        userData.totalContributions = undefined;
        userData.pendingSubmissions = undefined;
    }

    return userData
}
