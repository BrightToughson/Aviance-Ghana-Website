const fs = require('fs');

let content = fs.readFileSync('src/pages/public/ManagementPage.tsx', 'utf8');

// 1. Remove onClick and cursor-pointer from article in renderMemberCard
content = content.replace(
  'onClick={() => setViewProfileMember(member)}\n        className="group relative h-[440px] sm:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 text-left"',
  'className="group relative h-[440px] sm:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 text-left"'
);

// In case CRLF was present:
content = content.replace(
  'onClick={() => setViewProfileMember(member)}\r\n        className="group relative h-[440px] sm:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 text-left"',
  'className="group relative h-[440px] sm:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 text-left"'
);

// 2. Remove viewProfileMember modal JSX
const modalStartRegex = /\{\/\* Small Profile Modal: Executive Detailed Profile Card \*\/\}[\s\S]*?\{\/\* Profile Image Edit \/ Upload Modal \*\/\}/;

content = content.replace(modalStartRegex, '{/* Profile Image Edit / Upload Modal */}');

fs.writeFileSync('src/pages/public/ManagementPage.tsx', content, 'utf8');
console.log('Successfully removed profile modal from ManagementPage.tsx');
