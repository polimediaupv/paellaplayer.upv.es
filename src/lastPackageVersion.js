export default async function(user,repo) {
    const githubApiTags = await fetch(`https://api.github.com/repos/${user}/${repo}/tags`);
    if (githubApiTags.ok) {
        const tagData = await githubApiTags.json();
        const lastVersion = [0,0,0];
        const re = /^(\d+)\.(\d+)\.(\d+)$/;
        tagData.forEach(tagData => {
            const { name } = tagData;
            const version = re.exec(name);
            if (version) {
                if (version[1]>=Number(lastVersion[0]) && 
                    version[2]>=Number(lastVersion[1]) && 
                    version[3]>=Number(lastVersion[2])) {
                    lastVersion[0] = Number(version[1]);
                    lastVersion[1] = Number(version[2]);
                    lastVersion[2] = Number(version[3]);
                }
            }
        });
        return `${lastVersion[0]}.${lastVersion[1]}.${lastVersion[2]}`
    }
    return "0.0.0";
}
