// Snippets/AvatarImageSnippets.js
export const avatarImageSnippets = [
    {
      title: "Simple Avatar Snippet",
      jsxCode: `(props) => (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_MCuXs-CWBXJd56DshzTRxR06gkA6-Wm1Yg&s"
          alt="Avatar"
          className="w-16 h-16 rounded-full"
        />
      )`,
      cssCode: `<img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiGz1lyUXS5Jk0AdBScHFkUOlqniCpFZJO5A&s"
        alt="Avatar"
        style="width: 64px; height: 64px; border-radius: 50%;"
      />`,
    },
    {
      title: "Avatar with Status Indicator",
      jsxCode: `(props) => (
        <div className="relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiGz1lyUXS5Jk0AdBScHFkUOlqniCpFZJO5A&s"
            alt="Avatar"
            className="w-16 h-16 rounded-full"
          />
          <span className="absolute bottom-0 left-0 block w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      )`,
      cssCode: `<div style="position: relative;">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiGz1lyUXS5Jk0AdBScHFkUOlqniCpFZJO5A&s"
          alt="Avatar"
          style="width: 64px; height: 64px; border-radius: 50%;"
        />
        <span style="position: absolute; bottom: 0; right: 0; width: 16px; height: 16px; background-color: #38a169; border: 2px solid #fff; border-radius: 50%;"></span>
      </div>`,
    },
  ];
  