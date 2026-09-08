# BitFrame

AI Creative Film Studio / CM・映像制作サイトの公式リポジトリ。

## Goal

「美しい・動く・見やすい・速い」を同時に成立させる。

- Performance First
- Content First
- Usability First
- Motion Second
- AI Backstage

## Target

Production site: https://bitframe.rss7.net/

## Development

GitHubをSingle Source of Truthとして扱い、原則として `main` へ直接実装せず、Task → Branch → Implementation → Test → Pull Request → Review → Merge の流れで進める。

## Initial architecture

静的HTML / CSS / JavaScriptを基本とし、閲覧時のAI依存やローディング待ちを作らない。必要な画像・動画生成は制作時に行い、最適化済みアセットを配信する。
