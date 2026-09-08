# BitFrame

AI Creative Film Studio / CM・映像制作サイトの公式リポジトリ。

## Goal

「美しい・動く・見やすい」を中心に、プレミアムで映像的なブランド体験を作る。速度は重要だが、ブランド価値が明確に上がる画像・動画・モーションには多少のコストを許容する。

- Content Immediately Visible
- Premium Motion
- AI Backstage
- Mobile First

## Visual direction

TONMANAのような高品質なクリエイティブスタジオ体験を参考にする。参考対象は大胆なTypography、余白、画像と文字のレイヤー、スクロール体験、セクションごとのリズム、マイクロインタラクション、モーション品質のみ。コード・文章・画像・ロゴ・正確なレイアウト・ブランド表現はコピーしない。

## Media strategy

2026-09-18までは、利用可能なClaude Codeを主力として積極的に使用する。接続済みGoogle MCP / Google AIで画像・動画生成が実際に利用可能な場合は、Hero、Section visual、短尺loop、作品サムネイル、コンセプト素材などに積極的に使用する。

画像・動画は制作時に生成・選別・最適化し、閲覧者の初期表示でAI生成を待たせない。Hero動画を使う場合も、見出し・ナビゲーション・CTAは即表示する。poster / fallbackを用意し、Mobileでは別crop・短尺・静止画への切替も許可する。

## Target

Production site: https://bitframe.rss7.net/

## Development

GitHubをSingle Source of Truthとして扱い、原則として `main` へ直接実装せず、Task → Branch → Implementation → Test → Pull Request → Review → Merge の流れで進める。

## Initial architecture

静的HTML / CSS / JavaScriptを基本とする。複雑なプレミアムスクロール演出で明確な価値がある場合のみGSAP / ScrollTrigger等を採用してよい。Loading画面、初期表示のAI/API待ち、動画読込完了待ちは禁止する。詳細ルールは `AGENTS.md` を正とする。
