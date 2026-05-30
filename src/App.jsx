import { useState, useEffect, useCallback, useRef } from "react";

// ─── LOGO (base64 embedded) ───────────────────────────────────────────────────
const LOGO_SRC = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBmb250LWZhbWlseT0iVGltZXMgTmV3IFJvbWFuIiBmb250LXNpemU9IjE2IiBoZWlnaHQ9IjYzLjk5IiB2aWV3Qm94PSIwIDAgNDkyIDY0IiB3aWR0aD0iNDkxLjk0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJ3aWR0aDo0OTEuOTRweDsgaGVpZ2h0OjYzLjk5cHg7IGZvbnQtZmFtaWx5OidUaW1lcyBOZXcgUm9tYW4nOyBmb250LXNpemU6MTZweDsgZmlsbDpub25lIj48ZyBpZD0iRkFDRSBQcmVwIj48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04Mi43NTI0IDEuNTIwMzdIMTIyLjU0M1YxMy42OTI5SDk1LjgyMDdWMjUuODY1M0gxMjAuNTMzVjM4LjAzNzhIOTUuODIwN1Y2MS4zNjg0SDgyLjc1MjRWMS41MjAzN1pNMTQ2LjgzOCAxLjUyMDM3SDE1Ny42NDRMMTgzLjQ0NiA2MS4zNjg0SDE2OC43MDJMMTYzLjU5MiA0OC42ODg3SDE0MC41NTVMMTM1LjYxMyA2MS4zNjg0SDEyMS4yMDRMMTQ2LjgzOCAxLjUyMDM3Wk0xNTEuODYzIDE4LjkzMzdMMTQ0LjY1OSAzNy41MzA1SDE1OS4xNTFMMTUxLjg2MyAxOC45MzM3Wk0yMjguMTggMTcuMDc1M0MyMjYuODk2IDE1LjQ5NzQgMjI1LjMxOCAxNC4yODU4IDIyMy40NDcgMTMuNDQwNEMyMjEuNTc2IDEyLjU5NTEgMjE5LjQxMiAxMi4xNzI1IDIxNi45NTUgMTIuMTcyNUMyMTQuNDk3IDEyLjE3MjUgMjEyLjIyMiAxMi42NTE1IDIxMC4xMjcgMTMuNjA5NUMyMDguMDMzIDE0LjU2NzUgMjA2LjIxOCAxNS45MDU5IDIwNC42ODIgMTcuNjI0N0MyMDMuMTQ3IDE5LjM0MzUgMjAxLjk0NiAyMS4zODY0IDIwMS4wOCAyMy43NTMyQzIwMC4yMTUgMjYuMTIwMSAxOTkuNzgyIDI4LjY4NDIgMTk5Ljc4MiAzMS40NDU2QzE5OS43ODIgMzQuMjYzMyAyMDAuMjE1IDM2Ljg0MTUgMjAxLjA4IDM5LjE4MDJDMjAxLjk0NiA0MS41MTg5IDIwMy4xMzMgNDMuNTQ3NiAyMDQuNjQgNDUuMjY2NEMyMDYuMTQ4IDQ2Ljk4NTIgMjA3LjkyMiA0OC4zMjM2IDIwOS45NiA0OS4yODE2QzIxMS45OTggNTAuMjM5NyAyMTQuMTkgNTAuNzE4NyAyMTYuNTM2IDUwLjcxODdDMjE5LjIxNyA1MC43MTg3IDIyMS41OSA1MC4xNTUxIDIyMy42NTYgNDkuMDI4QzIyNS43MjMgNDcuOTAxIDIyNy40MjYgNDYuMzIzMSAyMjguNzY2IDQ0LjI5NDNMMjM5LjY1NyA1Mi40OTM4QzIzNy4xNDMgNTYuMDQ0MSAyMzMuOTYgNTguNjY0NiAyMzAuMTA3IDYwLjM1NTJDMjI2LjI1MyA2Mi4wNDU4IDIyMi4yODggNjIuODkxMSAyMTguMjExIDYyLjg5MTFDMjEzLjU3NiA2Mi44OTExIDIwOS4zMDQgNjIuMTU4NSAyMDUuMzk0IDYwLjY5MzNDMjAxLjQ4NSA1OS4yMjgxIDE5OC4xMDYgNTcuMTI5IDE5NS4yNTggNTQuMzk1OEMxOTIuNDEgNTEuNjYyNiAxOTAuMTkgNDguMzUxOCAxODguNTk4IDQ0LjQ2MzRDMTg3LjAwNyA0MC41NzQ5IDE4Ni4yMTEgMzYuMjM1NyAxODYuMjExIDMxLjQ0NTZDMTg2LjIxMSAyNi42NTU1IDE4Ny4wMDcgMjIuMzE2MiAxODguNTk4IDE4LjQyNzhDMTkwLjE5IDE0LjUzOTMgMTkyLjQxIDExLjIyODYgMTk1LjI1OCA4LjQ5NTM4QzE5OC4xMDYgNS43NjIxOSAyMDEuNDg1IDMuNjYzMDIgMjA1LjM5NCAyLjE5NzgxQzIwOS4zMDQgMC43MzI1OTYgMjEzLjU3NiAwIDIxOC4yMTEgMEMyMTkuODg3IDAgMjIxLjYzMiAwLjE1NDk3MiAyMjMuNDQ3IDAuNDY0OTIxQzIyNS4yNjIgMC43NzQ4NyAyMjcuMDQ5IDEuMjY3OTYgMjI4LjgwOCAxLjk0NDIyQzIzMC41NjggMi42MjA0NyAyMzIuMjU3IDMuNTIyMTIgMjMzLjg3NiA0LjY0OTIxQzIzNS40OTYgNS43NzYzIDIzNi45NDggNy4xNTY5NiAyMzguMjMzIDguNzkxMjRMMjI4LjE4IDE3LjA3NTNaTTI0Ny4yNzYgMS41MjAzN0gyODcuNTdWMTMuNjkyOUgyNjAuMzQ1VjI0Ljg1MUgyODYuMDYyVjM3LjAyMzRIMjYwLjM0NVY0OS4xOTU5SDI4OS4wNzhWNjEuMzY4NEgyNDcuMjc2VjEuNTIwMzdaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iRkFDRSIgLz48ZyBpZD0iR3JvdXAgMiI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzkuMjQ0NCAwLjAwMTk1MzEySDI2LjE2M1YxMy4wODMzSDM5LjI0NDRWMC4wMDE5NTMxMlpNMTMuMDc3OCAyNi4xNjM2SDBWMTMuMDg0M1YxMy4wODIyVjAuMDAyOTQxMThIMTMuMDc3OFYwLjAwMTk1MzEySDI2LjE1OTFWMTMuMDgyMlYxMy4wODMzVjI2LjE2MzZIMTMuMDgxNEgxMy4wNzc4Wk0xMy4wODE0IDI2LjE2NUgwVjM5LjI0NjRIMTMuMDgxNFYyNi4xNjVaIiBmaWxsPSIjRjA1MTM2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJDb21iaW5lZCBTaGFwZSIgLz48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02Mi4zOTMgMTAuMDU4Nkg0OS4zMTE3VjIzLjEzODlIMzYuMjMxNFYzNi4yMjAySDQ5LjMxMTdINDkuMzEyOEg2Mi4zOTNWMjMuMTRWMjMuMTM4OVYxMC4wNTg2Wk0zNi4yMjc1IDM2LjIyMTZIMjMuMTQ2MVY0OS4zMDE5SDEwLjA2ODRWNjIuMzgzM0gyMy4xNDYxSDIzLjE0OTdIMzYuMjI3NVY0OS4zMDNWNDkuMzAxOVYzNi4yMjE2Wk0zNi4yMzE0IDM2LjIyMTZINDkuMzExN0g0OS4zMTI4SDYyLjM5M1Y0OS4zMDE5VjQ5LjMwM1Y2Mi4zODMzSDQ5LjMxMjhINDkuMzExN0gzNi4yMzE0VjQ5LjMwM1Y0OS4zMDE5VjM2LjIyMTZaIiBmaWxsPSIjRjA1MTM2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJDb21iaW5lZCBTaGFwZV8yIiAvPjwvZz48ZyBpZD0iUHJlcCI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzA4LjkzOSAwLjAwMTk1MzEySDQ5MS41OTRMNDY0LjgzMSA2Mi4zOUgzMDguOTM5TDMwOC45MzkgMC4wMDE5NTMxMloiIGZpbGw9IiNGMDUxMzYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgaWQ9Ik1hc2siIC8+PG1hc2sgaGVpZ2h0PSI2MyIgaWQ9Im1hc2swXzQwM183MiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjE4NCIgeD0iMzA4IiB5PSIwIiBzdHlsZT0id2lkdGg6MTg0cHg7IGhlaWdodDo2M3B4OyBmb250LWZhbWlseTonVGltZXMgTmV3IFJvbWFuJzsgZm9udC1zaXplOjE2cHg7IGZpbGw6bm9uZTsgbWFzay10eXBlOmx1bWluYW5jZSI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzA4LjkzOSAwLjAwMTk1MzEySDQ5MS41OTRMNDY0LjgzMSA2Mi4zOUgzMDguOTM5TDMwOC45MzkgMC4wMDE5NTMxMloiIGZpbGw9IndoaXRlIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJNYXNrXzIiIC8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazBfNDAzXzcyKSI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzE2Ljk2NiA3LjA0ODgzSDMzNC43NzRDMzM3LjI1NyA3LjA0ODgzIDMzOS42MDQgNy4yNzUyMyAzNDEuODE2IDcuNzI4MDVDMzQ0LjAyOCA4LjE4MDg3IDM0NS45NTggOC45NjE5NyAzNDcuNjA1IDEwLjA3MTRDMzQ5LjI1MyAxMS4xODA4IDM1MC41NjIgMTIuNjc1MSAzNTEuNTMzIDE0LjU1NDNDMzUyLjUwMyAxNi40MzM1IDM1Mi45ODggMTguNzk5NCAzNTIuOTg4IDIxLjY1MjJDMzUyLjk4OCAyNC40NTk2IDM1Mi41MzcgMjYuODE0MiAzNTEuNjM0IDI4LjcxNjFDMzUwLjczMSAzMC42MTc5IDM0OS40OSAzMi4xMzQ4IDM0Ny45MSAzMy4yNjY5QzM0Ni4zMyAzNC4zOTg5IDM0NC40NTcgMzUuMjAyNyAzNDIuMjkgMzUuNjc4MUMzNDAuMTIzIDM2LjE1MzYgMzM3Ljc3NiAzNi4zOTEzIDMzNS4yNDggMzYuMzkxM0gzMjcuNTI5VjU1LjEzNzlIMzE2Ljk2NlY3LjA0ODgzWk0zMjcuNTI5IDI3LjQyODVIMzM0LjU3MUMzMzUuNTE5IDI3LjQyODUgMzM2LjQzMyAyNy4zMzc5IDMzNy4zMTMgMjcuMTU2OEMzMzguMTk0IDI2Ljk3NTYgMzM4Ljk4NCAyNi42NyAzMzkuNjgzIDI2LjIzOThDMzQwLjM4MyAyNS44MDk2IDM0MC45NDcgMjUuMjIxIDM0MS4zNzYgMjQuNDczOEMzNDEuODA1IDIzLjcyNjcgMzQyLjAxOSAyMi43ODcxIDM0Mi4wMTkgMjEuNjU1MUMzNDIuMDE5IDIwLjQzMjQgMzQxLjczNyAxOS40NDc2IDM0MS4xNzMgMTguNzAwNEMzNDAuNjA5IDE3Ljk1MzMgMzM5Ljg4NiAxNy4zNzU5IDMzOS4wMDYgMTYuOTY4NEMzMzguMTI2IDE2LjU2MDkgMzM3LjE0NCAxNi4zMDA1IDMzNi4wNjEgMTYuMTg3M0MzMzQuOTc3IDE2LjA3NDEgMzMzLjkzOSAxNi4wMTc1IDMzMi45NDYgMTYuMDE3NUgzMjcuNTI5VjI3LjQyODVaTTM2OC40OTQgMjIuMTMxMkgzNTguMzM4VjU1LjE0MTVIMzY4LjQ5NFY0MS4zNTMyQzM2OC40OTQgMzkuNzIzMSAzNjguNTg1IDM4LjIyODggMzY4Ljc2NSAzNi44NzAzQzM2OC45NDYgMzUuNTExOSAzNjkuMzQxIDM0LjM0NTkgMzY5Ljk1IDMzLjM3MjNDMzcwLjU2IDMyLjM5ODggMzcxLjQyOSAzMS42NDAzIDM3Mi41NTcgMzEuMDk2OUMzNzMuNjg2IDMwLjU1MzYgMzc1LjIyIDMwLjI4MTkgMzc3LjE2MSAzMC4yODE5QzM3Ny45MjkgMzAuMjgxOSAzNzguNjYyIDMwLjMzODUgMzc5LjM2MiAzMC40NTE3QzM4MC4wNjIgMzAuNTY0OSAzODAuNzczIDMwLjczNDcgMzgxLjQ5NSAzMC45NjExVjIxLjY1NTdDMzgwLjk5OCAyMS41MTk5IDM4MC40NTcgMjEuNDI5MyAzNzkuODcgMjEuMzg0QzM3OS4yODMgMjEuMzM4NyAzNzguNjk2IDIxLjMxNjEgMzc4LjEwOSAyMS4zMTYxQzM3NS44NTIgMjEuMzE2MSAzNzMuOTc5IDIxLjgyNTUgMzcyLjQ4OSAyMi44NDQ0QzM3MSAyMy44NjMyIDM2OS43MTMgMjUuMzkxNCAzNjguNjMgMjcuNDI5MUgzNjguNDk0VjIyLjEzMTJaTTQxNS44MjQgNDkuNDM2QzQxNC4xOTkgNTEuNTE5IDQxMi4xNDUgNTMuMTI2NCA0MDkuNjYyIDU0LjI1ODVDNDA3LjE3OSA1NS4zOTA1IDQwNC42MDYgNTUuOTU2NiA0MDEuOTQzIDU1Ljk1NjZDMzk5LjQxNSA1NS45NTY2IDM5Ny4wMzQgNTUuNTQ5IDM5NC43OTkgNTQuNzMzOUMzOTIuNTY1IDUzLjkxODkgMzkwLjYyNCA1Mi43NTI5IDM4OC45NzYgNTEuMjM1OUMzODcuMzI5IDQ5LjcxOSAzODYuMDMxIDQ3Ljg5NjQgMzg1LjA4MyA0NS43NjgyQzM4NC4xMzUgNDMuNjM5OSAzODMuNjYxIDQxLjI2MjcgMzgzLjY2MSAzOC42MzYzQzM4My42NjEgMzYuMDEgMzg0LjEzNSAzMy42MzI3IDM4NS4wODMgMzEuNTA0NUMzODYuMDMxIDI5LjM3NjIgMzg3LjMyOSAyNy41NTM3IDM4OC45NzYgMjYuMDM2N0MzOTAuNjI0IDI0LjUxOTggMzkyLjU2NSAyMy4zNTM4IDM5NC43OTkgMjIuNTM4N0MzOTcuMDM0IDIxLjcyMzYgMzk5LjQxNSAyMS4zMTYxIDQwMS45NDMgMjEuMzE2MUM0MDQuMjkgMjEuMzE2MSA0MDYuNDIzIDIxLjcyMzYgNDA4LjM0MiAyMi41Mzg3QzQxMC4yNiAyMy4zNTM4IDQxMS44ODUgMjQuNTE5OCA0MTMuMjE3IDI2LjAzNjdDNDE0LjU0OCAyNy41NTM3IDQxNS41NzUgMjkuMzc2MiA0MTYuMjk4IDMxLjUwNDVDNDE3LjAyIDMzLjYzMjcgNDE3LjM4MSAzNi4wMSA0MTcuMzgxIDM4LjYzNjNWNDEuODI4N0gzOTMuODE4QzM5NC4yMjQgNDMuNzc1OCAzOTUuMTA0IDQ1LjMyNjcgMzk2LjQ1OCA0Ni40ODE0QzM5Ny44MTMgNDcuNjM2MSAzOTkuNDgzIDQ4LjIxMzQgNDAxLjQ2OSA0OC4yMTM0QzQwMy4xMzkgNDguMjEzNCA0MDQuNTUgNDcuODM5OCA0MDUuNzAxIDQ3LjA5MjdDNDA2Ljg1MiA0Ni4zNDU1IDQwNy44NTYgNDUuMzgzMyA0MDguNzE0IDQ0LjIwNkw0MTUuODI0IDQ5LjQzNlpNNDA1LjUzNCAzMC40ODU1QzQwNi43MDcgMzEuNzA4MSA0MDcuMjcxIDMzLjE3OTggNDA3LjIyNiAzNC45MDA1SDM5My44MkMzOTMuODY1IDM0LjA4NTQgMzk0LjA1NyAzMy4zMDQzIDM5NC4zOTUgMzIuNTU3MUMzOTQuNzM0IDMxLjgxIDM5NS4yMDggMzEuMTUzNCAzOTUuODE3IDMwLjU4NzRDMzk2LjQyNiAzMC4wMjE0IDM5Ny4xNiAyOS41NTcyIDM5OC4wMTggMjkuMTk1QzM5OC44NzUgMjguODMyNyAzOTkuODY4IDI4LjY1MTYgNDAwLjk5NyAyOC42NTE2QzQwMi44NDggMjguNjUxNiA0MDQuMzYgMjkuMjYyOSA0MDUuNTM0IDMwLjQ4NTVaTTQyNC40OTMgMjIuMTMxMkg0MzMuODM3VjI2LjQ3ODJINDMzLjk3MkM0MzQuMzc4IDI1Ljg4OTUgNDM0LjkwOSAyNS4yODk2IDQzNS41NjMgMjQuNjc4M0M0MzYuMjE4IDI0LjA2NyA0MzYuOTg1IDIzLjUxMjMgNDM3Ljg2NSAyMy4wMTQyQzQzOC43NDYgMjIuNTE2MSA0MzkuNzA1IDIyLjEwODUgNDQwLjc0MyAyMS43OTE2QzQ0MS43ODEgMjEuNDc0NiA0NDIuODg3IDIxLjMxNjEgNDQ0LjA2MSAyMS4zMTYxQzQ0Ni40OTkgMjEuMzE2MSA0NDguNzEgMjEuNzM1IDQ1MC42OTcgMjIuNTcyN0M0NTIuNjgzIDIzLjQxMDQgNDU0LjM4NyAyNC41ODc3IDQ1NS44MDkgMjYuMTA0NkM0NTcuMjMxIDI3LjYyMTYgNDU4LjMyNSAyOS40MjE1IDQ1OS4wOTMgMzEuNTA0NUM0NTkuODYgMzMuNTg3NCA0NjAuMjQ0IDM1Ljg3NDEgNDYwLjI0NCAzOC4zNjQ2QzQ2MC4yNDQgNDAuNjc0IDQ1OS44OTQgNDIuODgxNSA0NTkuMTk0IDQ0Ljk4NzFDNDU4LjQ5NSA0Ny4wOTI3IDQ1Ny41MDIgNDguOTYwNSA0NTYuMjE1IDUwLjU5MDdDNDU0LjkyOSA1Mi4yMjA4IDQ1My4zNiA1My41MjI3IDQ1MS41MDkgNTQuNDk2MkM0NDkuNjU4IDU1LjQ2OTggNDQ3LjU1OSA1NS45NTY2IDQ0NS4yMTIgNTUuOTU2NkM0NDMuMDkgNTUuOTU2NiA0NDEuMTE2IDU1LjYyODMgNDM5LjI4NyA1NC45NzE3QzQzNy40NTkgNTQuMzE1MSA0MzUuOTU4IDUzLjE5NDQgNDM0Ljc4NSA1MS42MDk1SDQzNC42NDlWNzAuNjI3OEg0MjQuNDkzVjIyLjEzMTJaTTQzNS45NjggNDQuNjgwNkM0MzQuNTQ2IDQzLjE0MSA0MzMuODM1IDQxLjEyNiA0MzMuODM1IDM4LjYzNTVDNDMzLjgzNSAzNi4xNDUgNDM0LjU0NiAzNC4xMyA0MzUuOTY4IDMyLjU5MDRDNDM3LjM5IDMxLjA1MDggNDM5LjM4OCAzMC4yODEgNDQxLjk2MSAzMC4yODFDNDQ0LjUzNCAzMC4yODEgNDQ2LjUzMSAzMS4wNTA4IDQ0Ny45NTMgMzIuNTkwNEM0NDkuMzc1IDM0LjEzIDQ1MC4wODYgMzYuMTQ1IDQ1MC4wODYgMzguNjM1NUM0NTAuMDg2IDQxLjEyNiA0NDkuMzc1IDQzLjE0MSA0NDcuOTUzIDQ0LjY4MDZDNDQ2LjUzMSA0Ni4yMjAyIDQ0NC41MzQgNDYuOTg5OSA0NDEuOTYxIDQ2Ljk4OTlDNDM5LjM4OCA0Ni45ODk5IDQzNy4zOSA0Ni4yMjAyIDQzNS45NjggNDQuNjgwNloiIGZpbGw9IndoaXRlIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJQcmVwXzIiIC8+PC9nPjwvZz48L2c+PC9zdmc+";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ROLES = { ADMIN: "admin", REP: "user" };
const DEAL_STAGES = ["Prospect", "Presentation", "Negotiation", "Closed Won", "Closed Lost"];
const STAGE_COLORS = { "Prospect":"#0EA5E9","Presentation":"#F59E0B","Negotiation":"#8B5CF6","Closed Won":"#10B981","Closed Lost":"#EF4444" };

const DEFAULT_USERS = [
  { id: "dinesh", name: "Dinesh Raja Krishnasamy", role: ROLES.ADMIN, password: "admin123", email: "dinesh@faceprep.in" },
  { id: "rep1",   name: "Rep 1",                   role: ROLES.REP,   password: "rep123",   email: "rep1@faceprep.in" },
  { id: "rep2",   name: "Rep 2",                   role: ROLES.REP,   password: "rep456",   email: "rep2@faceprep.in" },
];

// ─── DEFAULT FIELD DEFINITIONS (admin-editable) ──────────────────────────────
const DEFAULT_FIELDS = [
  // Each: { id, section, label, type, options (for select), required, order }
  // Sections: opportunity | batch | program | allocation | logistics | billing | assessment
  { id:"title",           section:"opportunity", label:"Opportunity Title",    type:"text",     required:true,  order:1  },
  { id:"contactId",       section:"opportunity", label:"Point of Contact",     type:"contact",  required:false, order:2  },
  { id:"stage",           section:"opportunity", label:"Deal Stage",           type:"select",   options:["Prospect","Presentation","Negotiation","Closed Won","Closed Lost"], required:true, order:3 },
  { id:"department",      section:"batch",       label:"Department",           type:"text",     required:false, order:1  },
  { id:"yearPassout",     section:"batch",       label:"Year of Passout",      type:"select",   options:["2025","2026","2027","2028"], required:false, order:2 },
  { id:"batches",         section:"batch",       label:"No. of Batches",       type:"number",   required:false, order:3  },
  { id:"maxStudentsPerBatch",section:"batch",    label:"Max Students / Batch", type:"number",   required:false, order:4  },
  { id:"totalStudents",   section:"batch",       label:"Total Students",       type:"number",   required:false, order:5  },
  { id:"engagementType",  section:"program",     label:"Engagement Type",      type:"select",   options:["CSAC","CDP","ECAP","LEAP","Custom"], required:false, order:1 },
  { id:"oifType",         section:"program",     label:"OIF Type",             type:"select",   options:["TATKAL","Standard","Continuous"], required:false, order:2 },
  { id:"programName",     section:"program",     label:"Proposed Course",      type:"select",   options:["KAAR & TCS NQT CSAC","Aptitude & Reasoning","Soft Skills","Domain Specific","Coding Bootcamp","Communication Skills","Custom"], required:false, order:3 },
  { id:"courseVariant",   section:"program",     label:"Course Variant",       type:"text",     required:false, order:4  },
  { id:"startDate",       section:"program",     label:"Start Date",           type:"date",     required:true,  order:5  },
  { id:"endDate",         section:"program",     label:"End Date",             type:"date",     required:false, order:6  },
  { id:"aptitudeHours",   section:"program",     label:"Aptitude Hours",       type:"number",   required:false, order:7  },
  { id:"technicalHours",  section:"program",     label:"Technical Hours",      type:"number",   required:false, order:8  },
  { id:"softSkillsHours", section:"program",     label:"Soft Skills Hours",    type:"number",   required:false, order:9  },
  { id:"trainingHoursPerBatch",section:"program",label:"Training Hrs/Batch",   type:"number",   required:false, order:10 },
  { id:"trainingDaysPerBatch", section:"program",label:"Training Days/Batch",  type:"number",   required:false, order:11 },
  { id:"totalTrainerDays",section:"program",     label:"Total Trainer Days",   type:"number",   required:false, order:12 },
  { id:"trainingLanguage",section:"allocation",  label:"Training Language",    type:"select",   options:["Only English","Tamil + English","Only Tamil"], required:false, order:1 },
  { id:"programmingLanguage",section:"allocation",label:"Programming Language",type:"text",     required:false, order:2  },
  { id:"infrastructure",  section:"allocation",  label:"Infrastructure",       type:"select",   options:["Client to arrange","FACE Prep to arrange","Shared"], required:false, order:3 },
  { id:"sessionTimings",  section:"allocation",  label:"Session Timings",      type:"text",     required:false, order:4  },
  { id:"collegeTiming",   section:"allocation",  label:"College Timing",       type:"text",     required:false, order:5  },
  { id:"studentsLevel",   section:"allocation",  label:"Students Level",       type:"text",     required:false, order:6  },
  { id:"keyContact",      section:"allocation",  label:"Key P&T Contact",      type:"text",     required:false, order:7  },
  { id:"onlyMaleTrainers",section:"allocation",  label:"Only Male Trainers",   type:"checkbox", required:false, order:8  },
  { id:"clientExpectation",section:"allocation", label:"Client Expectation",   type:"textarea", required:false, order:9  },
  { id:"tpoStrategy",     section:"allocation",  label:"TPO Strategy",         type:"textarea", required:false, order:10 },
  { id:"accommodationBy", section:"logistics",   label:"Accommodation By",     type:"select",   options:["Client to arrange","FACE Prep to arrange","Not Required"], required:false, order:1 },
  { id:"accommodationType",section:"logistics",  label:"Accommodation Type",   type:"select",   options:["Hotel","College Guest House","Not Applicable"], required:false, order:2 },
  { id:"internalCommute", section:"logistics",   label:"Internal Commute",     type:"select",   options:["College Bus","Auto","Cab","OLA/Uber/Red Taxi","Not Applicable"], required:false, order:3 },
  { id:"localCommute",    section:"logistics",   label:"Local Commute",        type:"select",   options:["College Bus","Auto","Cab","OLA/Uber/Red Taxi","Not Applicable"], required:false, order:4 },
  { id:"meals",           section:"logistics",   label:"Meals Provided",       type:"select",   options:["All 3 meals","Lunch only","No meals","Self-arranged"], required:false, order:5 },
  { id:"pricingType",     section:"billing",     label:"Pricing Type",         type:"select",   options:["Per Student Per Day","Per Student","Fixed"], required:false, order:1 },
  { id:"netPrice",        section:"billing",     label:"Net Price (₹)",        type:"number",   required:false, order:2  },
  { id:"grossPrice",      section:"billing",     label:"Gross Price (₹)",      type:"number",   required:false, order:3  },
  { id:"netBV",           section:"billing",     label:"Net BV (₹)",           type:"number",   required:false, order:4  },
  { id:"grossBV",         section:"billing",     label:"Gross BV (₹)",         type:"number",   required:false, order:5  },
  { id:"minStudentsBilled",section:"billing",    label:"Min Students to Bill", type:"number",   required:false, order:6  },
  { id:"paymentType",     section:"billing",     label:"Payment Type",         type:"select",   options:["One time payment","Advance + Balance","Milestone based"], required:false, order:7 },
  { id:"invoiceType",     section:"billing",     label:"Invoice Type",         type:"text",     required:false, order:8  },
  { id:"invoiceTerms",    section:"billing",     label:"Invoice Terms",        type:"text",     required:false, order:9  },
  { id:"advanceDetails",  section:"billing",     label:"Advance Details",      type:"text",     required:false, order:10 },
  { id:"clientConfirmation",section:"billing",   label:"Client Confirmation",  type:"text",     required:false, order:11 },
  { id:"testsRequired",   section:"assessment",  label:"Tests Required",       type:"text",     required:false, order:1  },
  { id:"preAssessmentDate",section:"assessment", label:"Pre-Assessment Date",  type:"date",     required:false, order:2  },
  { id:"midAssessmentDate",section:"assessment", label:"Mid-Assessment Date",  type:"date",     required:false, order:3  },
  { id:"postAssessmentDate",section:"assessment",label:"Post-Assessment Date", type:"date",     required:false, order:4  },
  { id:"dailyTests",      section:"assessment",  label:"Daily Test Schedule",  type:"text",     required:false, order:5  },
  { id:"otherSpecs",      section:"assessment",  label:"Other Specifications", type:"textarea", required:false, order:6  },
];

const SECTION_LABELS = { opportunity:"Opportunity", batch:"Batch Details", program:"Program & Duration", allocation:"Allocation Info", logistics:"Logistics", billing:"Billing & Commercials", assessment:"Assessment & Other" };
const INST_TYPES = ["Engineering","Arts & Science","Polytechnic","Management","Deemed University","Autonomous"];
const CLIENT_SEGMENTS = ["A+","A","B+","B","C"];
const STATES = ["Tamil Nadu","Karnataka","Andhra Pradesh","Telangana","Kerala","Maharashtra","Delhi","Other"];

// ─── THEME ────────────────────────────────────────────────────────────────────
const DARK = { bg:"#0B0F1A",surface:"#111827",surfaceAlt:"#1A2235",border:"#1F2D45",text:"#F1F5F9",textMid:"#94A3B8",textDim:"#475569",orange:"#F97316",orangeDim:"#F9731614",teal:"#0EA5E9",green:"#10B981",red:"#EF4444",yellow:"#F59E0B",shadow:"0 2px 20px rgba(0,0,0,0.5)", isDark:true };
const LIGHT = { bg:"#F4F6FA",surface:"#FFFFFF",surfaceAlt:"#F1F5F9",border:"#E2E8F0",text:"#0F172A",textMid:"#475569",textDim:"#94A3B8",orange:"#EA6C00",orangeDim:"#EA6C0010",teal:"#0284C7",green:"#059669",red:"#DC2626",yellow:"#D97706",shadow:"0 2px 20px rgba(0,0,0,0.08)", isDark:false };

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
// Replace these two values with your own from the Supabase project dashboard.
// Settings → API → Project URL  and  Settings → API → anon public key
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ─── STORAGE (Supabase-backed key-value store) ────────────────────────────────
// Uses a single table called "crm_store" with columns: key (text PK), value (text).
// All data is still JSON-serialised, so the rest of the app is unchanged.
const db = {
  async get(k) {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/crm_store?key=eq.${encodeURIComponent(k)}&select=value`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      );
      if (!res.ok) return null;
      const rows = await res.json();
      return rows.length ? JSON.parse(rows[0].value) : null;
    } catch { return null; }
  },
  async set(k, val) {
    try {
      await fetch(
        `${SUPABASE_URL}/rest/v1/crm_store`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates",   // upsert
          },
          body: JSON.stringify({ key: k, value: JSON.stringify(val) }),
        }
      );
    } catch(e) { console.error("db.set failed:", e); }
  },
};

// ─── EMAIL HELPERS ────────────────────────────────────────────────────────────
function eRow(label, value) {
  return `<tr><td style="padding:7px 14px;background:#f8f9fa;font-weight:600;width:210px;border:1px solid #dee2e6;font-size:13px;color:#495057;white-space:nowrap">${label}</td><td style="padding:7px 14px;border:1px solid #dee2e6;font-size:13px;color:#212529">${value||"—"}</td></tr>`;
}
function eSection(title, rows) {
  return `<tr><td colspan="2" style="padding:8px 14px;background:#E85D00;color:#fff;font-weight:800;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">${title}</td></tr>${rows}`;
}
function buildOpsHTML(d, inst) {
  return `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#212529">
<p style="font-size:14px">Dear Operations Team,</p>
<p style="font-size:14px">A new training program has been approved. Please coordinate trainer allocation and logistics.</p>
<table style="border-collapse:collapse;width:100%;margin-top:16px">
${eSection("Client Details", eRow("Institution",inst?.name)+eRow("Client Code",inst?.clientCode)+eRow("Segment",inst?.segment)+eRow("City / State",`${inst?.city||""}, ${inst?.state||""}`))}
${eSection("Opportunity", eRow("Title",d.title)+eRow("Point of Contact",d._contactName||""))}
${eSection("Batch Details", eRow("Department",d.department)+eRow("Year of Passout",d.yearPassout)+eRow("Batches",d.batches)+eRow("Max/Batch",d.maxStudentsPerBatch)+eRow("Total Students",d.totalStudents))}
${eSection("Program & Duration", eRow("Engagement Type",d.engagementType)+eRow("OIF Type",d.oifType)+eRow("Proposed Course",d.programName)+eRow("Course Variant",d.courseVariant)+eRow("Training Dates",`${d.startDate} to ${d.endDate}`)+eRow("Aptitude Hrs",d.aptitudeHours)+eRow("Technical Hrs",d.technicalHours)+eRow("Soft Skills Hrs",d.softSkillsHours)+eRow("Hrs/Batch",d.trainingHoursPerBatch)+eRow("Days/Batch",d.trainingDaysPerBatch)+eRow("Total Trainer Days",d.totalTrainerDays))}
${eSection("Allocation Info", eRow("Training Language",d.trainingLanguage)+eRow("Programming Language",d.programmingLanguage)+eRow("Infrastructure",d.infrastructure)+eRow("Session Timings",d.sessionTimings)+eRow("College Timing",d.collegeTiming)+eRow("Only Male Trainers",d.onlyMaleTrainers?"Yes":"No")+eRow("Key Contact",d.keyContact)+eRow("Students Level",d.studentsLevel)+eRow("Client Expectation",d.clientExpectation)+eRow("TPO Strategy",d.tpoStrategy))}
${eSection("Logistics", eRow("Accommodation By",d.accommodationBy)+eRow("Accommodation Type",d.accommodationType)+eRow("Internal Commute",d.internalCommute)+eRow("Local Commute",d.localCommute)+eRow("Meals",d.meals))}
${eSection("Assessment", eRow("Tests Required",d.testsRequired)+eRow("Pre-Assessment",d.preAssessmentDate)+eRow("Post-Assessment",d.postAssessmentDate)+eRow("Daily Tests",d.dailyTests))}
${d.otherSpecs ? eSection("Other Specs", eRow("Notes",d.otherSpecs)) : ""}
</table>
<p style="font-size:13px;margin-top:20px">Regards,<br/><strong>${d.repName}</strong><br/>FACE Prep</p></div>`;
}
function buildFinanceHTML(d, inst) {
  return `<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#212529">
<p style="font-size:14px">Dear Finance Team,</p>
<p style="font-size:14px">A new training program has been approved. Please initiate invoicing at the earliest.</p>
<table style="border-collapse:collapse;width:100%;margin-top:16px">
${eSection("Basic Information", eRow("Institution",inst?.name)+eRow("Client Code",inst?.clientCode)+eRow("Segment",inst?.segment)+eRow("City / State",`${inst?.city||""}, ${inst?.state||""}`)+eRow("Opportunity Title",d.title)+eRow("Program",d.programName)+eRow("Training Dates",`${d.startDate} to ${d.endDate}`)+eRow("Mode","Offline"))}
${eSection("Commercial Details", eRow("Pricing Type",d.pricingType)+eRow("Net Price",d.netPrice?`₹${Number(d.netPrice).toLocaleString("en-IN")}`:"—")+eRow("Gross Price",d.grossPrice?`₹${Number(d.grossPrice).toLocaleString("en-IN")}`:"—")+eRow("Total Students",d.totalStudents)+eRow("Total Trainer Days",d.totalTrainerDays)+eRow("Net BV",d.netBV?`₹${Number(d.netBV).toLocaleString("en-IN")}`:"—")+eRow("Gross BV",d.grossBV?`₹${Number(d.grossBV).toLocaleString("en-IN")}`:"—"))}
${eSection("Billing", eRow("Payment Type",d.paymentType)+eRow("Invoice Type",d.invoiceType)+eRow("Invoice Terms",d.invoiceTerms)+eRow("Min Students",d.minStudentsBilled)+eRow("Advance Details",d.advanceDetails||"NA")+eRow("Client Confirmation",d.clientConfirmation||"Not Uploaded"))}
</table>
<p style="font-size:13px;margin-top:20px">Regards,<br/><strong>${d.repName}</strong><br/>FACE Prep</p></div>`;
}

// ─── CSV EXPORT ───────────────────────────────────────────────────────────────
function exportCSV(rows, filename) {
  if (!rows.length) { alert("No data to export."); return; }
  const h = Object.keys(rows[0]).join(",");
  const b = rows.map(r => Object.values(r).map(v => `"${String(v??'').replace(/"/g,'""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([h+"\n"+b],{type:"text/csv"}));
  a.download = filename; a.click();
}
function dealToRow(d, inst) {
  return { Title:d.title||"", Institution:inst?.name||"", "Client Code":inst?.clientCode||"", Segment:inst?.segment||"", City:inst?.city||"", State:inst?.state||"", Program:d.programName, "Engagement":d.engagementType, "OIF Type":d.oifType, "Start":d.startDate, "End":d.endDate, Batches:d.batches, Students:d.totalStudents, "Trainer Days":d.totalTrainerDays, "Net Price":d.netPrice, "Net BV":d.netBV, "Gross BV":d.grossBV, "Payment":d.paymentType, Stage:d.stage, Status:d.status, "User":d.repName };
}

// ─── ANIMATION HOOK ───────────────────────────────────────────────────────────
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = `opacity 0.45s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.45s cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
    requestAnimationFrame(() => { requestAnimationFrame(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }); });
  }, [delay]);
  return ref;
}

// ─── DESIGN PRIMITIVES ────────────────────────────────────────────────────────
function Badge({ text, color }) {
  return <span style={{ background:color+"22",color,border:`1px solid ${color}44`,borderRadius:6,padding:"2px 10px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",whiteSpace:"nowrap" }}>{text}</span>;
}
function Btn({ children, variant="primary", C, loading, ...props }) {
  const v = { primary:{background:C.orange,color:"#fff",border:"none"}, ghost:{background:"transparent",color:C.textMid,border:`1px solid ${C.border}`}, success:{background:C.green,color:"#fff",border:"none"}, danger:{background:C.red,color:"#fff",border:"none"}, teal:{background:C.teal,color:"#fff",border:"none"}, warning:{background:C.yellow,color:"#000",border:"none"} };
  const { style, disabled, onClick, onMouseEnter, onMouseLeave, type, title, ...rest } = props;
  // strip non-DOM props before spreading
  const domProps = { style, disabled: loading||disabled, onClick, type, title };
  Object.keys(domProps).forEach(k => domProps[k]===undefined && delete domProps[k]);
  return <button {...domProps}
    style={{ ...v[variant],borderRadius:8,padding:"8px 14px",fontSize:13,fontWeight:700,cursor:loading?"wait":"pointer",display:"inline-flex",alignItems:"center",gap:6,fontFamily:"inherit",transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)",opacity:loading?0.7:1,...(style||{}) }}
    onMouseEnter={e=>{if(!loading)e.currentTarget.style.filter="brightness(1.1)"}}
    onMouseLeave={e=>{e.currentTarget.style.filter="none"}}>{loading?"Sending…":children}</button>;
}

function inputStyle(C) { return { width:"100%",background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.text,fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"inherit",transition:"border-color 0.2s" }; }
function labelStyle(C) { return { display:"block",fontSize:11,fontWeight:700,color:C.textDim,marginBottom:5,textTransform:"uppercase",letterSpacing:0.9 }; }

function FInput({ label, C, hint, ...props }) {
  const [focus,setFocus]=useState(false);
  return <div style={{marginBottom:14}}>
    {label && <label style={labelStyle(C)}>{label}</label>}
    <input {...props} onFocus={e=>{setFocus(true);props.onFocus&&props.onFocus(e)}} onBlur={e=>{setFocus(false);props.onBlur&&props.onBlur(e)}}
      style={{...inputStyle(C),borderColor:focus?C.orange:C.border,...(props.style||{})}} />
    {hint && <div style={{fontSize:10,color:C.textDim,marginTop:4}}>{hint}</div>}
  </div>;
}
function FSelect({ label, options, C, ...props }) {
  const [focus,setFocus]=useState(false);
  return <div style={{marginBottom:14}}>
    {label && <label style={labelStyle(C)}>{label}</label>}
    <select {...props} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} style={{...inputStyle(C),borderColor:focus?C.orange:C.border}}>
      <option value="">Select…</option>{options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  </div>;
}
function FTextarea({ label, C, ...props }) {
  const [focus,setFocus]=useState(false);
  return <div style={{marginBottom:14}}>
    {label && <label style={labelStyle(C)}>{label}</label>}
    <textarea {...props} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} style={{...inputStyle(C),minHeight:70,resize:"vertical",borderColor:focus?C.orange:C.border}} />
  </div>;
}
function SecTitle({ children, C }) {
  return <div style={{fontSize:11,fontWeight:800,color:C.orange,letterSpacing:1.5,textTransform:"uppercase",margin:"22px 0 12px",borderBottom:`1px solid ${C.border}`,paddingBottom:7}}>{children}</div>;
}
function Modal({ title, onClose, children, wide, C }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16,backdropFilter:"blur(4px)",animation:"fadeIn 0.2s ease"}}>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:18,padding:28,width:"100%",maxWidth:wide?980:660,maxHeight:"93vh",overflowY:"auto",boxShadow:`0 32px 80px rgba(0,0,0,0.5)`,animation:"slideUp 0.3s cubic-bezier(0.4,0,0.2,1)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <span style={{fontSize:18,fontWeight:800,color:C.text}}>{title}</span>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.textDim,cursor:"pointer",fontSize:26,lineHeight:1,transition:"color 0.15s"}} onMouseEnter={e=>e.currentTarget.style.color=C.red} onMouseLeave={e=>e.currentTarget.style.color=C.textDim}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
function ThemeToggle({ dark, setDark, C }) {
  return <button onClick={()=>setDark(d=>!d)} style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:20,padding:"5px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,color:C.textMid,transition:"all 0.25s",fontFamily:"inherit"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.orange} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
    <span style={{transition:"transform 0.3s",display:"inline-block",transform:dark?"rotate(0deg)":"rotate(180deg)"}}>{dark?"☀️":"🌙"}</span>{dark?"Light":"Dark"}
  </button>;
}

// ─── DYNAMIC OIF FORM (field-definition driven) ───────────────────────────────
function DealForm({ initial, instContacts, onSave, onCancel, user, C, fieldDefs }) {
  const empty = {};
  fieldDefs.forEach(f => { empty[f.id] = f.type==="checkbox" ? false : ""; });
  const [f, setF] = useState(initial ? { ...empty, ...initial } : { ...empty });
  const s = (k, v) => {
    const upd = { ...f, [k]: v };
    const n=Number(upd.netPrice), g=Number(upd.grossPrice), st=Number(upd.totalStudents), d=Number(upd.trainingDaysPerBatch);
    if(n&&st&&d) upd.netBV=String(Math.round(n*st*d));
    if(g&&st&&d) upd.grossBV=String(Math.round(g*st*d));
    setF(upd);
  };

  const sections = [...new Set(fieldDefs.map(f=>f.section))];
  const G2 = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 };

  const renderField = (fd) => {
    if (fd.id === "contactId") {
      return <div key={fd.id} style={{marginBottom:14}}>
        <label style={labelStyle(C)}>{fd.label}</label>
        <select value={f.contactId||""} onChange={e=>s("contactId",e.target.value)} style={inputStyle(C)}>
          <option value="">Select contact…</option>
          {instContacts.map(c=><option key={c.id} value={c.id}>{c.name} — {c.designation} ({c.phone})</option>)}
        </select>
        {instContacts.length===0&&<div style={{fontSize:11,color:C.yellow,marginTop:4}}>No contacts added for this institution yet.</div>}
      </div>;
    }
    if (fd.type==="select")    return <FSelect key={fd.id} label={fd.label} options={fd.options||[]} value={f[fd.id]||""} onChange={e=>s(fd.id,e.target.value)} C={C} />;
    if (fd.type==="textarea")  return <FTextarea key={fd.id} label={fd.label} value={f[fd.id]||""} onChange={e=>s(fd.id,e.target.value)} C={C} />;
    if (fd.type==="checkbox")  return <div key={fd.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,paddingTop:4}}><input type="checkbox" id={fd.id} checked={!!f[fd.id]} onChange={e=>s(fd.id,e.target.checked)} style={{accentColor:C.orange,width:16,height:16}}/><label htmlFor={fd.id} style={{fontSize:13,color:C.textMid,cursor:"pointer"}}>{fd.label}</label></div>;
    if (fd.id==="netBV")       return <FInput key={fd.id} label={fd.label} type="number" value={f[fd.id]||""} onChange={e=>s(fd.id,e.target.value)} C={C} hint="Auto: Net Price × Students × Days/Batch" />;
    if (fd.id==="grossBV")     return <FInput key={fd.id} label={fd.label} type="number" value={f[fd.id]||""} onChange={e=>s(fd.id,e.target.value)} C={C} hint="Auto: Gross Price × Students × Days/Batch" />;
    return <FInput key={fd.id} label={fd.label} type={fd.type==="number"?"number":fd.type==="date"?"date":"text"} value={f[fd.id]||""} onChange={e=>s(fd.id,e.target.value)} C={C} />;
  };

  return <div>
    {sections.map((sec,si) => {
      const sFields = fieldDefs.filter(fd=>fd.section===sec).sort((a,b)=>a.order-b.order);
      const textareas = sFields.filter(fd=>fd.type==="textarea"||fd.type==="checkbox"||fd.type==="contact");
      const grid = sFields.filter(fd=>fd.type!=="textarea"&&fd.type!=="checkbox"&&fd.type!=="contact");
      return <div key={sec} style={{animation:`slideUp 0.3s ease ${si*0.04}s both`}}>
        <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <SecTitle C={C}>{SECTION_LABELS[sec]||sec}</SecTitle>
        <div style={G2}>{grid.map(renderField)}</div>
        {textareas.map(renderField)}
      </div>;
    })}
    {user.role===ROLES.REP&&<div style={{fontSize:12,color:C.yellow,marginBottom:14,padding:"9px 14px",background:C.yellow+"18",borderRadius:8,border:`1px solid ${C.yellow}44`}}>ⓘ This will be submitted for manager approval before emails are triggered.</div>}
    <div style={{display:"flex",gap:10,marginTop:8}}>
      <Btn C={C} onClick={()=>{
        const req = fieldDefs.filter(fd=>fd.required);
        const missing = req.filter(fd=>!f[fd.id]&&f[fd.id]!==true);
        if(missing.length){alert(`Required: ${missing.map(fd=>fd.label).join(", ")}`);return;}
        onSave(f);
      }}>{user.role===ROLES.REP?"Submit for Approval":"Save & Approve"}</Btn>
      <Btn C={C} variant="ghost" onClick={onCancel}>Cancel</Btn>
    </div>
  </div>;
}

// ─── ADD INST MODAL ───────────────────────────────────────────────────────────
function AddInstModal({ onClose, onSave, C }) {
  const [f,setF]=useState({name:"",clientCode:"",segment:"",city:"",state:"",type:"",address:""});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return <Modal title="Add Institution" onClose={onClose} C={C}>
    <FInput label="Institution Name *" value={f.name} onChange={e=>s("name",e.target.value)} C={C}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <FInput label="Client Code" placeholder="EC10008" value={f.clientCode} onChange={e=>s("clientCode",e.target.value)} C={C}/>
      <FSelect label="Segment" options={CLIENT_SEGMENTS} value={f.segment} onChange={e=>s("segment",e.target.value)} C={C}/>
      <FInput label="City" value={f.city} onChange={e=>s("city",e.target.value)} C={C}/>
      <FSelect label="State" options={STATES} value={f.state} onChange={e=>s("state",e.target.value)} C={C}/>
      <FSelect label="Institution Type" options={INST_TYPES} value={f.type} onChange={e=>s("type",e.target.value)} C={C}/>
    </div>
    <FTextarea label="Address" value={f.address} onChange={e=>s("address",e.target.value)} C={C}/>
    <div style={{display:"flex",gap:8,marginTop:4}}>
      <Btn C={C} onClick={()=>{if(!f.name){alert("Name required");return;}onSave(f);}}>Save Institution</Btn>
      <Btn C={C} variant="ghost" onClick={onClose}>Cancel</Btn>
    </div>
  </Modal>;
}

// ─── ADD CONTACT MODAL ────────────────────────────────────────────────────────
function AddContactModal({ onClose, onSave, C }) {
  const [f,setF]=useState({name:"",designation:"",phone:"",email:""});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return <Modal title="Add Contact" onClose={onClose} C={C}>
    <FInput label="Name *" value={f.name} onChange={e=>s("name",e.target.value)} C={C}/>
    <FInput label="Designation" value={f.designation} onChange={e=>s("designation",e.target.value)} C={C}/>
    <FInput label="Mobile" value={f.phone} onChange={e=>s("phone",e.target.value)} C={C}/>
    <FInput label="Email" value={f.email} onChange={e=>s("email",e.target.value)} C={C}/>
    <div style={{display:"flex",gap:8,marginTop:4}}>
      <Btn C={C} onClick={()=>{if(!f.name){alert("Name required");return;}onSave(f);}}>Save Contact</Btn>
      <Btn C={C} variant="ghost" onClick={onClose}>Cancel</Btn>
    </div>
  </Modal>;
}

// ─── ADD/EDIT DEAL MODAL ──────────────────────────────────────────────────────
function AddDealModal({ institutions, contacts, user, initialInstId, initial, onClose, onSave, C, fieldDefs }) {
  const [instId,setInstId]=useState(initialInstId||"");
  const instContacts = contacts.filter(c=>c.institutionId===instId);
  return <Modal title={initial?"Edit OIF":"New OIF"} onClose={onClose} wide C={C}>
    {!instId ? <div>
      <div style={{marginBottom:16,fontSize:13,color:C.textMid}}>Select the institution first.</div>
      <div style={{marginBottom:14}}><label style={labelStyle(C)}>Institution</label>
        <select style={inputStyle(C)} value={instId} onChange={e=>setInstId(e.target.value)}>
          <option value="">Select institution…</option>
          {institutions.map(i=><option key={i.id} value={i.id}>{i.name} — {i.city}</option>)}
        </select>
      </div>
      <Btn C={C} variant="ghost" onClick={onClose}>Cancel</Btn>
    </div>
    : <DealForm initial={initial} instContacts={instContacts} user={user} C={C} fieldDefs={fieldDefs}
        onSave={f=>onSave(instId,f)} onCancel={onClose}/>}
  </Modal>;
}

// ─── VIEW DEAL MODAL ──────────────────────────────────────────────────────────
function ViewDealModal({ deal, inst, contacts, user, deals, onClose, onSaveDeals, onEdit, onClone, onEmailPreview, C, fieldDefs }) {
  const contact = contacts.find(c=>c.id===deal.contactId);
  const dealWithContact = { ...deal, _contactName: contact ? `${contact.name} (${contact.phone})` : "" };
  const sections = [...new Set(fieldDefs.map(fd=>fd.section))];
  return <Modal title="OIF Details" onClose={onClose} wide C={C}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
      <div>
        <div style={{fontSize:18,fontWeight:900,color:C.text}}>{deal.title||deal.programName}</div>
        <div style={{fontSize:12,color:C.textDim,marginTop:3}}>{inst?.name} · {deal.repName} · {new Date(deal.createdAt).toLocaleDateString("en-IN")}</div>
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        <Badge text={deal.stage} color={STAGE_COLORS[deal.stage]||"#6366f1"}/>
        <Badge text={deal.status} color={deal.status==="Approved"?C.green:deal.status==="Rejected"?C.red:C.yellow}/>
      </div>
    </div>
    {sections.map(sec=>{
      const sFields = fieldDefs.filter(fd=>fd.section===sec).sort((a,b)=>a.order-b.order);
      return <div key={sec}>
        <SecTitle C={C}>{SECTION_LABELS[sec]||sec}</SecTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:4}}>
          {sFields.map(fd=>{
            let val = deal[fd.id];
            if(fd.id==="contactId") val = contact ? `${contact.name} (${contact.phone})` : "";
            if(fd.type==="checkbox") val = val ? "Yes" : "No";
            if(!val&&val!==0) return null;
            return <div key={fd.id} style={{background:C.surfaceAlt,borderRadius:8,padding:"8px 12px"}}>
              <div style={{fontSize:10,color:C.textDim,textTransform:"uppercase",fontWeight:700}}>{fd.label}</div>
              <div style={{fontSize:13,fontWeight:700,marginTop:2,color:C.text}}>{String(val)}</div>
            </div>;
          })}
        </div>
      </div>;
    })}
    {user.role===ROLES.ADMIN&&deal.status==="Approved"&&<div style={{marginTop:18}}>
      <div style={labelStyle(C)}>Update Stage</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
        {DEAL_STAGES.map(st=><button key={st} onClick={async()=>{await onSaveDeals(deals.map(d=>d.id===deal.id?{...d,stage:st}:d));onClose();}}
          style={{padding:"5px 14px",borderRadius:6,fontSize:12,cursor:"pointer",fontWeight:700,fontFamily:"inherit",transition:"all 0.15s",background:deal.stage===st?STAGE_COLORS[st]:"transparent",border:`1px solid ${STAGE_COLORS[st]}`,color:deal.stage===st?"#fff":STAGE_COLORS[st]}}>{st}</button>)}
      </div>
    </div>}
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12,borderTop:`1px solid ${C.border}`,paddingTop:14}}>
      <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={onEdit}>✏️ Edit</Btn>
      <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={onClone}>📋 Clone</Btn>
      {deal.status==="Approved"&&<>
        <Btn C={C} variant="teal" style={{fontSize:12}} onClick={onEmailPreview}>📧 Email Preview</Btn>
        <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={()=>exportCSV([dealToRow(deal,inst)],`oif-${Date.now()}.csv`)}>⬇ CSV</Btn>
      </>}
      {user.role===ROLES.ADMIN&&<Btn C={C} variant="danger" style={{fontSize:12}} onClick={async()=>{if(!window.confirm("Delete?"))return;await onSaveDeals(deals.filter(d=>d.id!==deal.id));onClose();}}>Delete</Btn>}
    </div>
  </Modal>;
}

// ─── EMAIL PREVIEW MODAL (with EmailJS) ──────────────────────────────────────
function EmailPreviewModal({ deal, inst, onClose, C, emailjsConfig }) {
  const [tab,setTab]=useState("ops");
  const [sending,setSending]=useState(false);
  const [sent,setSent]=useState({ops:false,finance:false});
  const html = tab==="ops" ? buildOpsHTML(deal,inst) : buildFinanceHTML(deal,inst);
  const subject = tab==="ops"
    ? `Training Approved — ${inst?.name} | ${deal.title||deal.programName}`
    : `Invoice Required — ${inst?.name} | ${deal.title||deal.programName}`;

  async function sendEmail() {
    if(!emailjsConfig?.serviceId||!emailjsConfig?.templateId||!emailjsConfig?.publicKey) {
      alert("EmailJS not configured. Go to Settings → Email Config to set it up.");return;
    }
    const toEmail = tab==="ops" ? emailjsConfig.opsEmail : emailjsConfig.financeEmail;
    if(!toEmail){alert(`${tab==="ops"?"Ops":"Finance"} email not configured in Settings.`);return;}
    setSending(true);
    try {
      const res = await fetch(`https://api.emailjs.com/api/v1.0/email/send`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          service_id:emailjsConfig.serviceId,
          template_id:emailjsConfig.templateId,
          user_id:emailjsConfig.publicKey,
          template_params:{ to_email:toEmail, subject, html_body:html, from_name:deal.repName }
        })
      });
      if(res.ok||res.status===200){setSent(s=>({...s,[tab]:true}));alert(`Email sent to ${toEmail}!`);}
      else{const t=await res.text();alert(`Send failed: ${t}`);}
    } catch(e){alert(`Error: ${e.message}`);}
    setSending(false);
  }

  return <Modal title="Email Preview" onClose={onClose} wide C={C}>
    <div style={{fontSize:12,color:C.textDim,marginBottom:14}}>Preview the email below. Use "Send via EmailJS" to trigger directly, or "Open in Mail" for your mail client.</div>
    <div style={{display:"flex",gap:8,marginBottom:16}}>
      <Btn C={C} variant={tab==="ops"?"primary":"ghost"} onClick={()=>setTab("ops")} style={{fontSize:12}}>📋 Operations</Btn>
      <Btn C={C} variant={tab==="finance"?"primary":"ghost"} onClick={()=>setTab("finance")} style={{fontSize:12}}>💰 Finance</Btn>
      {sent[tab]&&<span style={{fontSize:12,color:C.green,alignSelf:"center",fontWeight:700}}>✓ Sent</span>}
    </div>
    <div style={{background:"#fff",borderRadius:10,padding:16,marginBottom:14,border:`1px solid ${C.border}`,maxHeight:380,overflowY:"auto"}} dangerouslySetInnerHTML={{__html:html}}/>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      <Btn C={C} variant="primary" loading={sending} onClick={sendEmail}>📨 Send via EmailJS</Btn>
      <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={()=>{
        const to=tab==="ops"?emailjsConfig?.opsEmail||"operations@faceprep.in":emailjsConfig?.financeEmail||"finance@faceprep.in";
        const plain=`Dear ${tab==="ops"?"Operations":"Finance"} Team,\n\nA training program has been approved for ${inst?.name}.\nOpportunity: ${deal.title}\nDates: ${deal.startDate} to ${deal.endDate}\nStudents: ${deal.totalStudents}\nNet BV: ₹${Number(deal.netBV||0).toLocaleString("en-IN")}\n\nRegards,\n${deal.repName}\nFACE Prep`;
        window.location.href=`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plain)}`;
      }}>📬 Open in Mail App</Btn>
      <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={()=>{navigator.clipboard.writeText(html);alert("HTML copied.");}}>📋 Copy HTML</Btn>
      <Btn C={C} variant="ghost" onClick={onClose}>Close</Btn>
    </div>
  </Modal>;
}


// ─── DASHBOARD VIEW ───────────────────────────────────────────────────────────
function DashboardView({ deals, institutions, contacts, users, C }) {
  const ref = useFadeIn(0);
  const approved  = deals.filter(d => d.status === "Approved");
  const pending   = deals.filter(d => d.status === "Pending Approval");
  const rejected  = deals.filter(d => d.status === "Rejected");
  const closedWon = approved.filter(d => d.stage === "Closed Won");
  const totalNetBV  = closedWon.reduce((s,d) => s + Number(d.netBV||0), 0);
  const totalGrossBV= closedWon.reduce((s,d) => s + Number(d.grossBV||0), 0);
  const pipelineBV  = approved.filter(d => d.stage !== "Closed Lost").reduce((s,d) => s + Number(d.netBV||0), 0);

  // Rep performance
  const reps = users.filter(u => u.role === ROLES.REP);
  const repStats = reps.map(r => {
    const repDeals = deals.filter(d => d.repId === r.id);
    const repClosed = repDeals.filter(d => d.stage === "Closed Won" && d.status === "Approved");
    return { name: r.name, total: repDeals.length, closed: repClosed.length, bv: repClosed.reduce((s,d) => s+Number(d.netBV||0),0), pending: repDeals.filter(d=>d.status==="Pending Approval").length };
  });

  // Stage breakdown
  const stageCounts = DEAL_STAGES.map(s => ({ stage:s, count: approved.filter(d=>d.stage===s).length }));

  // Recent activity
  const recent = [...deals].sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)).slice(0,6);

  // Month-wise closed BV
  const monthMap = {};
  closedWon.forEach(d => {
    if(!d.createdAt) return;
    const key = new Date(d.createdAt).toLocaleDateString("en-IN",{month:"short",year:"2-digit"});
    monthMap[key] = (monthMap[key]||0) + Number(d.netBV||0);
  });
  const months = Object.entries(monthMap).slice(-6);
  const maxBV = months.length ? Math.max(...months.map(([,v])=>v)) : 1;

  const card = (label, value, color, sub) => (
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 22px",borderLeft:`3px solid ${color}`,transition:"transform 0.2s,box-shadow 0.2s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=C.shadow}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
      <div style={{fontSize:11,fontWeight:700,color:C.textDim,textTransform:"uppercase",letterSpacing:0.8}}>{label}</div>
      <div style={{fontSize:26,fontWeight:900,color,marginTop:4}}>{value}</div>
      {sub && <div style={{fontSize:11,color:C.textDim,marginTop:2}}>{sub}</div>}
    </div>
  );

  return (
    <div ref={ref}>
      <div style={{fontSize:24,fontWeight:900,color:C.text,marginBottom:4}}>Dashboard</div>
      <div style={{fontSize:13,color:C.textDim,marginBottom:24}}>Overview of your sales pipeline and team performance</div>

      {/* Top KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
        {[
          ["Institutions", institutions.length, C.teal, `${contacts.length} contacts`],
          ["Total Deals", deals.length, C.orange, `${approved.length} approved`],
          ["Pipeline BV", `₹${(pipelineBV/100000).toFixed(1)}L`, "#8B5CF6", "Active pipeline"],
          ["Closed BV", `₹${(totalNetBV/100000).toFixed(1)}L`, C.green, `Gross ₹${(totalGrossBV/100000).toFixed(1)}L`],
        ].map(([l,v,col,sub],i) => <div key={l} ref={useFadeIn(i*60)}>{card(l,v,col,sub)}</div>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>

        {/* Stage Funnel */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:20}}>
          <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:16}}>Pipeline by Stage</div>
          {stageCounts.map(({stage,count}) => {
            const pct = approved.length ? Math.round((count/approved.length)*100) : 0;
            return <div key={stage} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:12,fontWeight:700,color:C.textMid}}>{stage}</span>
                <span style={{fontSize:12,fontWeight:700,color:STAGE_COLORS[stage]}}>{count}</span>
              </div>
              <div style={{height:6,background:C.surfaceAlt,borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,background:STAGE_COLORS[stage],borderRadius:3,transition:"width 0.8s cubic-bezier(0.4,0,0.2,1)"}}/>
              </div>
            </div>;
          })}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:16}}>
            {[["Pending",pending.length,C.yellow],["Rejected",rejected.length,C.red],["Approved",approved.length,C.green]].map(([l,v,col])=>
              <div key={l} style={{background:C.surfaceAlt,borderRadius:8,padding:"8px 10px",textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:900,color:col}}>{v}</div>
                <div style={{fontSize:10,color:C.textDim,textTransform:"uppercase",fontWeight:700,marginTop:2}}>{l}</div>
              </div>
            )}
          </div>
        </div>

        {/* Rep Performance */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:20}}>
          <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:16}}>User Performance</div>
          {repStats.length === 0 && <div style={{fontSize:12,color:C.textDim}}>No reps added yet.</div>}
          {repStats.map((r,i) => (
            <div key={r.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:C.orangeDim,border:`1px solid ${C.orange}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:C.orange,fontWeight:800}}>{r.name[0]}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:C.text}}>{r.name}</div>
                  <div style={{fontSize:11,color:C.textDim}}>{r.total} deals · {r.pending} pending</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:13,fontWeight:800,color:C.green}}>₹{(r.bv/100000).toFixed(1)}L</div>
                <div style={{fontSize:10,color:C.textDim}}>{r.closed} closed</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>

        {/* Monthly BV bar chart */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:20}}>
          <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:16}}>Monthly Closed BV</div>
          {months.length === 0 && <div style={{fontSize:12,color:C.textDim,padding:"20px 0",textAlign:"center"}}>No closed deals yet.</div>}
          <div style={{display:"flex",alignItems:"flex-end",gap:10,height:120,paddingBottom:4}}>
            {months.map(([month,bv]) => (
              <div key={month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{fontSize:9,color:C.textDim,fontWeight:700}}>₹{(bv/100000).toFixed(1)}L</div>
                <div style={{width:"100%",background:C.orange,borderRadius:"4px 4px 0 0",transition:"height 0.8s cubic-bezier(0.4,0,0.2,1)",height:`${Math.round((bv/maxBV)*80)}px`,minHeight:4}}/>
                <div style={{fontSize:9,color:C.textDim,fontWeight:600}}>{month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:20}}>
          <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:16}}>Recent OIFs</div>
          {recent.length === 0 && <div style={{fontSize:12,color:C.textDim}}>No deals yet.</div>}
          {recent.map(d => {
            const inst = institutions.find(i => i.id === d.institutionId);
            return <div key={d.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:C.text}}>{inst?.name||"?"}</div>
                <div style={{fontSize:11,color:C.textDim}}>{d.title||d.programName} · {d.repName}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3}}>
                <Badge text={d.status} color={d.status==="Approved"?C.green:d.status==="Rejected"?C.red:C.yellow}/>
                <span style={{fontSize:10,color:C.textDim}}>{new Date(d.createdAt).toLocaleDateString("en-IN")}</span>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

// ─── PIPELINE VIEW ────────────────────────────────────────────────────────────
function PipelineView({ deals, institutions, user, onAddDeal, onViewDeal, C }) {
  const ref = useFadeIn(0);
  const approved = deals.filter(d=>d.status==="Approved");
  const closedBV = approved.filter(d=>d.stage==="Closed Won").reduce((s,d)=>s+Number(d.netBV||0),0);
  const pendingMine = deals.filter(d=>d.status==="Pending Approval"&&(user.role===ROLES.ADMIN||d.repId===user.id));
  return <div ref={ref}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div>
        <div style={{fontSize:24,fontWeight:900,color:C.text}}>Pipeline</div>
        <div style={{fontSize:13,color:C.textDim,marginTop:2}}>{approved.length} approved deals</div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={()=>exportCSV(deals.map(d=>dealToRow(d,institutions.find(i=>i.id===d.institutionId))),`pipeline-${Date.now()}.csv`)}>⬇ Full CSV</Btn>
        <Btn C={C} onClick={onAddDeal}>+ New OIF</Btn>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
      {[["Total Deals",deals.length,C.orange],["Approved",approved.length,C.green],["Pending",deals.filter(d=>d.status==="Pending Approval").length,C.yellow],["Closed BV",`₹${(closedBV/100000).toFixed(1)}L`,C.teal]].map(([l,v,color],i)=>(
        <div key={l} ref={useFadeIn(i*60)} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 20px",borderLeft:`3px solid ${color}`,transition:"transform 0.2s,box-shadow 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=C.shadow}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
          <div style={{fontSize:11,fontWeight:700,color:C.textDim,textTransform:"uppercase",letterSpacing:0.8}}>{l}</div>
          <div style={{fontSize:24,fontWeight:900,color,marginTop:4}}>{v}</div>
        </div>
      ))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
      {DEAL_STAGES.map((stage,si)=>{
        const col=approved.filter(d=>d.stage===stage);
        return <div key={stage} ref={useFadeIn(si*50)} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{fontSize:11,fontWeight:800,color:STAGE_COLORS[stage],textTransform:"uppercase",letterSpacing:0.5}}>{stage}</span>
            <span style={{fontSize:11,background:STAGE_COLORS[stage]+"22",color:STAGE_COLORS[stage],borderRadius:20,padding:"1px 8px",fontWeight:700}}>{col.length}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {col.map(deal=>{
              const inst=institutions.find(i=>i.id===deal.institutionId);
              return <div key={deal.id} onClick={()=>onViewDeal(deal)} style={{background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:10,padding:10,cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.orange;e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=C.shadow}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
                <div style={{fontSize:11,fontWeight:900,color:C.text}}>{inst?.name||"?"}</div>
                <div style={{fontSize:11,color:C.textDim,marginTop:1}}>{deal.title||deal.programName}</div>
                <div style={{fontSize:10,color:C.textDim}}>{deal.startDate}</div>
                {deal.netBV&&<div style={{fontSize:11,color:C.green,fontWeight:700,marginTop:3}}>₹{Number(deal.netBV).toLocaleString("en-IN")}</div>}
                <div style={{fontSize:10,color:C.textDim,marginTop:2}}>{deal.repName}</div>
              </div>;
            })}
          </div>
        </div>;
      })}
    </div>
    {pendingMine.length>0&&<div style={{marginTop:20,background:C.surface,border:`1px solid ${C.yellow}44`,borderRadius:14,padding:16,animation:"slideUp 0.3s ease"}}>
      <div style={{fontSize:13,fontWeight:800,color:C.yellow,marginBottom:10}}>⏳ Awaiting Approval ({pendingMine.length})</div>
      {pendingMine.map(deal=>{
        const inst=institutions.find(i=>i.id===deal.institutionId);
        return <div key={deal.id} onClick={()=>onViewDeal(deal)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <div><span style={{fontSize:13,fontWeight:700,color:C.text}}>{inst?.name}</span><span style={{fontSize:12,color:C.textDim,marginLeft:10}}>{deal.title||deal.programName} · {deal.startDate}</span></div>
          <Badge text="Pending" color={C.yellow}/>
        </div>;
      })}
    </div>}
  </div>;
}

// ─── CONTACTS VIEW (standalone tab) ──────────────────────────────────────────
function ContactsView({ contacts, institutions, onAddContact, onDeleteContact, C }) {
  const [search,setSearch]=useState("");
  const [filterInst,setFilterInst]=useState("");
  const ref=useFadeIn(0);

  const filtered=contacts.filter(ct=>{
    const matchSearch=!search||ct.name.toLowerCase().includes(search.toLowerCase())||ct.phone?.includes(search)||ct.email?.toLowerCase().includes(search.toLowerCase());
    const matchInst=!filterInst||ct.institutionId===filterInst;
    return matchSearch&&matchInst;
  });

  // Group by institution
  const grouped={};
  filtered.forEach(ct=>{
    const key=ct.institutionId||"unlinked";
    if(!grouped[key])grouped[key]=[];
    grouped[key].push(ct);
  });

  // CSV export
  const exportContacts=()=>{
    const rows=filtered.map(ct=>{
      const inst=institutions.find(i=>i.id===ct.institutionId);
      return {Name:ct.name,Designation:ct.designation||"",Phone:ct.phone||"",Email:ct.email||"",Institution:inst?.name||"",City:inst?.city||"",State:inst?.state||""};
    });
    exportCSV(rows,`contacts-${Date.now()}.csv`);
  };

  return <div ref={ref}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <span style={{fontSize:24,fontWeight:900,color:C.text}}>Contacts <span style={{fontSize:14,color:C.textDim,fontWeight:400}}>({filtered.length})</span></span>
      <div style={{display:"flex",gap:8}}>
        <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={exportContacts}>⬇ Export CSV</Btn>
      </div>
    </div>
    {/* Filters */}
    <div style={{display:"flex",gap:12,marginBottom:20}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, phone, email…"
        style={{...inputStyle(C),maxWidth:280,padding:"8px 12px",fontSize:13}}/>
      <select value={filterInst} onChange={e=>setFilterInst(e.target.value)} style={{...inputStyle(C),maxWidth:240,padding:"8px 12px",fontSize:13}}>
        <option value="">All Institutions</option>
        {institutions.map(i=><option key={i.id} value={i.id}>{i.name}</option>)}
      </select>
    </div>

    {filtered.length===0&&<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:48,textAlign:"center",color:C.textDim}}>
      <div style={{fontSize:36,marginBottom:10}}>👤</div>No contacts found.
    </div>}

    {/* Grouped by institution */}
    {Object.entries(grouped).map(([instId,cts])=>{
      const inst=institutions.find(i=>i.id===instId);
      return <div key={instId} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{fontSize:14,fontWeight:800,color:C.text}}>{inst?.name||"Unlinked"}</div>
            {inst&&<div style={{fontSize:11,color:C.textDim}}>{inst.city}, {inst.state}</div>}
          </div>
          {inst&&<Btn C={C} variant="ghost" style={{fontSize:11,padding:"4px 10px"}} onClick={()=>onAddContact(instId)}>+ Add Contact</Btn>}
        </div>
        {cts.map(ct=><div key={ct.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderTop:`1px solid ${C.border}`}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:C.orangeDim,border:`1px solid ${C.orange}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:C.orange,fontWeight:800,flexShrink:0}}>{ct.name[0]?.toUpperCase()||"?"}</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>{ct.name}</div>
              <div style={{fontSize:11,color:C.textDim}}>{ct.designation}{ct.designation&&ct.phone?" · ":""}{ct.phone}</div>
              {ct.email&&<div style={{fontSize:11,color:C.teal}}>{ct.email}</div>}
            </div>
          </div>
          <Btn C={C} variant="danger" style={{fontSize:11,padding:"3px 8px"}} onClick={()=>{if(window.confirm(`Delete contact ${ct.name}?`))onDeleteContact(ct.id);}}>Remove</Btn>
        </div>)}
      </div>;
    })}
  </div>;
}

// ─── INSTITUTIONS VIEW ────────────────────────────────────────────────────────
function InstitutionsView({ institutions, contacts, deals, user, onAddInst, onAddContact, onAddDeal, onViewDeal, C }) {
  const [selId,setSelId]=useState(null);
  const inst=institutions.find(i=>i.id===selId)||null;
  const instContacts=contacts.filter(c=>c.institutionId===selId);
  const instDeals=deals.filter(d=>d.institutionId===selId);
  const ref=useFadeIn(0);
  return <div ref={ref} style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:20,minHeight:600}}>
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <span style={{fontSize:18,fontWeight:900,color:C.text}}>Institutions</span>
        <Btn C={C} onClick={onAddInst} style={{fontSize:12,padding:"6px 12px"}}>+ Add</Btn>
      </div>
      {institutions.length===0&&<div style={{fontSize:13,color:C.textDim,textAlign:"center",marginTop:40}}>No institutions yet.</div>}
      {institutions.map((i,idx)=><div key={i.id} ref={useFadeIn(idx*30)} onClick={()=>setSelId(i.id)}
        style={{background:selId===i.id?C.surfaceAlt:C.surface,border:`1px solid ${selId===i.id?C.orange:C.border}`,borderRadius:12,padding:"12px 14px",cursor:"pointer",marginBottom:8,transition:"all 0.2s cubic-bezier(0.4,0,0.2,1)"}}
        onMouseEnter={e=>{if(selId!==i.id)e.currentTarget.style.borderColor=C.orange+"88";}}
        onMouseLeave={e=>{if(selId!==i.id)e.currentTarget.style.borderColor=C.border;}}>
        <div style={{fontSize:13,fontWeight:700,color:C.text}}>{i.name}</div>
        <div style={{fontSize:11,color:C.textDim,marginTop:2}}>{i.city}, {i.state}</div>
        <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>
          <Badge text={i.type} color={C.orange}/>
          {i.segment&&<Badge text={`Seg ${i.segment}`} color={C.teal}/>}
        </div>
      </div>)}
    </div>
    {inst ? <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:900,color:C.text}}>{inst.name}</div>
          <div style={{fontSize:13,color:C.textDim,marginTop:2}}>{inst.city}, {inst.state} · {inst.type}{inst.clientCode?` · ${inst.clientCode}`:""}{inst.segment?` · Seg ${inst.segment}`:""}</div>
          {inst.address&&<div style={{fontSize:11,color:C.textDim,marginTop:4}}>{inst.address}</div>}
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={()=>exportCSV(instDeals.map(d=>dealToRow(d,inst)),`inst-${inst.name.replace(/\s/g,"_")}-${Date.now()}.csv`)}>⬇ CSV</Btn>
          <Btn C={C} onClick={()=>onAddDeal(inst.id)} style={{fontSize:12}}>+ New OIF</Btn>
        </div>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:11,fontWeight:800,color:C.textMid,letterSpacing:1.2,textTransform:"uppercase"}}>Contacts</span>
          <Btn C={C} variant="ghost" onClick={()=>onAddContact(inst.id)} style={{fontSize:11,padding:"4px 10px"}}>+ Add</Btn>
        </div>
        {instContacts.length===0&&<div style={{fontSize:12,color:C.textDim}}>No contacts yet.</div>}
        {instContacts.map(ct=><div key={ct.id} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:C.orangeDim,border:`1px solid ${C.orange}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:C.orange,fontWeight:800,flexShrink:0}}>{ct.name[0].toUpperCase()}</div>
          <div><div style={{fontSize:13,fontWeight:700,color:C.text}}>{ct.name}</div><div style={{fontSize:11,color:C.textDim}}>{ct.designation} · {ct.phone}</div>{ct.email&&<div style={{fontSize:11,color:C.teal}}>{ct.email}</div>}</div>
        </div>)}
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:16}}>
        <div style={{fontSize:11,fontWeight:800,color:C.textMid,letterSpacing:1.2,textTransform:"uppercase",marginBottom:12}}>Deals ({instDeals.length})</div>
        {instDeals.length===0&&<div style={{fontSize:12,color:C.textDim}}>No deals yet.</div>}
        {instDeals.map(d=><div key={d.id} onClick={()=>onViewDeal(d)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt+"88"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.text}}>{d.title||d.programName}</div>
            <div style={{fontSize:11,color:C.textDim}}>{d.startDate} → {d.endDate} · {d.totalStudents} students · {d.batches} batches</div>
            {d.netBV&&<div style={{fontSize:11,color:C.green,fontWeight:700}}>Net BV ₹{Number(d.netBV).toLocaleString("en-IN")}</div>}
          </div>
          <div style={{display:"flex",gap:6}}>
            <Badge text={d.stage} color={STAGE_COLORS[d.stage]||C.orange}/>
            <Badge text={d.status} color={d.status==="Approved"?C.green:d.status==="Rejected"?C.red:C.yellow}/>
          </div>
        </div>)}
      </div>
    </div>
    : <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:C.textDim,fontSize:14,gap:10,opacity:0.5}}><span style={{fontSize:40}}>🏫</span>Select an institution</div>}
  </div>;
}

// ─── APPROVALS VIEW ───────────────────────────────────────────────────────────
function ApprovalsView({ deals, institutions, onApprove, onReject, onViewDeal, C }) {
  const ref=useFadeIn(0);
  const pending=deals.filter(d=>d.status==="Pending Approval");
  return <div ref={ref}>
    <div style={{fontSize:24,fontWeight:900,color:C.text,marginBottom:20}}>Approvals {pending.length>0&&<span style={{color:C.yellow}}>({pending.length})</span>}</div>
    {pending.length===0&&<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:48,textAlign:"center",color:C.textDim}}><div style={{fontSize:36,marginBottom:10}}>✅</div>All caught up.</div>}
    {pending.map((deal,i)=>{
      const inst=institutions.find(i=>i.id===deal.institutionId);
      return <div key={deal.id} ref={useFadeIn(i*60)} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:20,marginBottom:14,transition:"transform 0.2s,box-shadow 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow=C.shadow}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div style={{fontSize:16,fontWeight:900,color:C.text}}>{inst?.name}</div>
            <div style={{fontSize:13,fontWeight:700,color:C.textDim}}>{deal.title}</div>
            <div style={{fontSize:12,color:C.textDim}}>By {deal.repName} · {new Date(deal.createdAt).toLocaleDateString("en-IN")}</div>
          </div>
          <Badge text="Pending" color={C.yellow}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
          {[["OIF Type",deal.oifType],["Dates",`${deal.startDate}→${deal.endDate}`],["Students",deal.totalStudents],["Batches",deal.batches],["Trainer Days",deal.totalTrainerDays],["Net BV",deal.netBV?`₹${Number(deal.netBV).toLocaleString("en-IN")}`:""],["Gross BV",deal.grossBV?`₹${Number(deal.grossBV).toLocaleString("en-IN")}`:""],["Payment",deal.paymentType]].filter(([,v])=>v).map(([k,v])=>
            <div key={k} style={{background:C.surfaceAlt,borderRadius:8,padding:"9px 12px"}}>
              <div style={{fontSize:10,color:C.textDim,fontWeight:700,textTransform:"uppercase"}}>{k}</div>
              <div style={{fontSize:13,fontWeight:700,marginTop:3,color:C.text}}>{v}</div>
            </div>)}
        </div>
        <div style={{display:"flex",gap:10}}>
          <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={()=>onViewDeal(deal)}>🔍 Review Full OIF</Btn>
          <Btn C={C} variant="success" onClick={()=>onApprove(deal.id)}>✓ Approve & Email</Btn>
          <Btn C={C} variant="danger" onClick={()=>onReject(deal.id)}>✗ Reject</Btn>
        </div>
      </div>;
    })}
  </div>;
}

// ─── ADMIN SETTINGS: Users ────────────────────────────────────────────────────
function UsersAdmin({ users, onSave, C }) {
  const [list,setList]=useState(users);
  const [adding,setAdding]=useState(false);
  const [nf,setNf]=useState({name:"",role:ROLES.REP,password:"",email:""});
  const ns=(k,v)=>setNf(p=>({...p,[k]:v}));
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <span style={{fontSize:16,fontWeight:800,color:C.text}}>Users</span>
      <Btn C={C} onClick={()=>setAdding(true)} style={{fontSize:12}}>+ Add User</Btn>
    </div>
    {list.map(u=><div key={u.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:C.surfaceAlt,borderRadius:10,marginBottom:8}}>
      <div>
        <div style={{fontSize:13,fontWeight:700,color:C.text}}>{u.name}</div>
        <div style={{fontSize:11,color:C.textDim}}>{u.email} · {u.role}</div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <Badge text={u.role==="user"?"User":u.role==="admin"?"Admin":u.role} color={u.role===ROLES.ADMIN?C.orange:C.teal}/>
        <Btn C={C} variant="danger" style={{fontSize:11,padding:"4px 10px"}} onClick={()=>{if(u.role===ROLES.ADMIN&&list.filter(x=>x.role===ROLES.ADMIN).length<=1){alert("Need at least one admin.");return;}const upd=list.filter(x=>x.id!==u.id);setList(upd);onSave(upd);}}>Remove</Btn>
      </div>
    </div>)}
    {adding&&<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:20,marginTop:14}}>
      <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:12}}>New User</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <FInput label="Full Name" value={nf.name} onChange={e=>ns("name",e.target.value)} C={C}/>
        <FInput label="Email" value={nf.email} onChange={e=>ns("email",e.target.value)} C={C}/>
        <FInput label="Password" type="password" value={nf.password} onChange={e=>ns("password",e.target.value)} C={C}/>
        <div style={{marginBottom:14}}><label style={labelStyle(C)}>Role</label>
          <select value={nf.role} onChange={e=>ns("role",e.target.value)} style={inputStyle(C)}>
            <option value={ROLES.REP}>User</option><option value={ROLES.ADMIN}>Admin</option>
          </select>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn C={C} onClick={()=>{if(!nf.name||!nf.password){alert("Name and password required");return;}const u={...nf,id:`user_${Date.now()}`};const upd=[...list,u];setList(upd);onSave(upd);setAdding(false);setNf({name:"",role:ROLES.REP,password:"",email:""});}}>Add User</Btn>
        <Btn C={C} variant="ghost" onClick={()=>setAdding(false)}>Cancel</Btn>
      </div>
    </div>}
  </div>;
}

// ─── ADMIN SETTINGS: Field Manager ───────────────────────────────────────────
function FieldManager({ fieldDefs, onSave, C }) {
  const [fields,setFields]=useState(fieldDefs);
  const [editing,setEditing]=useState(null);
  const [adding,setAdding]=useState(false);
  const [saved,setSaved]=useState(false);
  useEffect(()=>{ setFields(fieldDefs); },[fieldDefs]);
  const [nf,setNf]=useState({id:"",section:"opportunity",label:"",type:"text",options:"",required:false,order:99});
  const ns=(k,v)=>setNf(p=>({...p,[k]:v}));
  const sections=Object.keys(SECTION_LABELS);

  const saveField=()=>{
    if(!nf.label||!nf.id){alert("ID and Label required");return;}
    const parsed={...nf,id:nf.id.replace(/\s/g,"_"),options:nf.options?nf.options.split(",").map(s=>s.trim()):[]};
    let upd;
    if(editing){upd=fields.map(f=>f.id===editing?parsed:f);}
    else{if(fields.find(f=>f.id===parsed.id)){alert("Field ID already exists");return;}upd=[...fields,parsed];}
    setFields(upd);onSave(upd);setSaved(true);setTimeout(()=>setSaved(false),2000);setEditing(null);setAdding(false);setNf({id:"",section:"opportunity",label:"",type:"text",options:"",required:false,order:99});
  };

  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <span style={{fontSize:16,fontWeight:800,color:C.text}}>OIF Fields</span>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {saved&&<span style={{fontSize:12,color:C.green,fontWeight:700}}>✓ Saved</span>}
        <Btn C={C} onClick={()=>{setAdding(true);setEditing(null);}} style={{fontSize:12}}>+ Add Field</Btn>
      </div>
    </div>
    {sections.map(sec=><div key={sec} style={{marginBottom:20}}>
      <div style={{fontSize:11,fontWeight:800,color:C.orange,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8,borderBottom:`1px solid ${C.border}`,paddingBottom:6}}>{SECTION_LABELS[sec]}</div>
      {fields.filter(f=>f.section===sec).sort((a,b)=>a.order-b.order).map(f=><div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:C.surfaceAlt,borderRadius:8,marginBottom:6}}>
        <div>
          <span style={{fontSize:13,fontWeight:700,color:C.text}}>{f.label}</span>
          <span style={{fontSize:11,color:C.textDim,marginLeft:10}}>{f.type}</span>
          {f.required&&<span style={{fontSize:10,color:C.orange,marginLeft:8,fontWeight:700}}>REQUIRED</span>}
        </div>
        <div style={{display:"flex",gap:6}}>
          {f.type==="select"&&<Btn C={C} variant="ghost" style={{fontSize:11,padding:"3px 8px"}} onClick={()=>{setEditing(f.id);setAdding(true);setNf({...f,options:Array.isArray(f.options)?f.options.join(", "):""});}}>Edit Options</Btn>}
          <Btn C={C} variant="ghost" style={{fontSize:11,padding:"3px 8px"}} onClick={()=>{setEditing(f.id);setAdding(true);setNf({...f,options:Array.isArray(f.options)?f.options.join(", "):""});}}>Edit</Btn>
          <Btn C={C} variant="danger" style={{fontSize:11,padding:"3px 8px"}} onClick={()=>{const upd=fields.filter(x=>x.id!==f.id);setFields(upd);onSave(upd);}}>Remove</Btn>
        </div>
      </div>)}
    </div>)}
    {(adding)&&<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:20,marginTop:14}}>
      <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:12}}>{editing?"Edit Field":"New Field"}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <FInput label="Field ID (no spaces)" value={nf.id} onChange={e=>ns("id",e.target.value)} C={C} placeholder="e.g. tpoName"/>
        <FInput label="Label" value={nf.label} onChange={e=>ns("label",e.target.value)} C={C}/>
        <div style={{marginBottom:14}}><label style={labelStyle(C)}>Section</label><select value={nf.section} onChange={e=>ns("section",e.target.value)} style={inputStyle(C)}>{sections.map(s=><option key={s} value={s}>{SECTION_LABELS[s]}</option>)}</select></div>
        <div style={{marginBottom:14}}><label style={labelStyle(C)}>Type</label><select value={nf.type} onChange={e=>ns("type",e.target.value)} style={inputStyle(C)}>{["text","number","date","select","textarea","checkbox"].map(t=><option key={t} value={t}>{t}</option>)}</select></div>
        <FInput label="Order (within section)" type="number" value={nf.order} onChange={e=>ns("order",Number(e.target.value))} C={C}/>
        <div style={{display:"flex",alignItems:"center",gap:10,paddingTop:20}}><input type="checkbox" checked={nf.required} onChange={e=>ns("required",e.target.checked)} style={{accentColor:C.orange,width:16,height:16}}/><label style={{fontSize:13,color:C.textMid}}>Required field</label></div>
      </div>
      {nf.type==="select"&&<FTextarea label="Options (comma-separated)" value={nf.options} onChange={e=>ns("options",e.target.value)} C={C} placeholder="Option A, Option B, Option C"/>}
      <div style={{display:"flex",gap:8}}>
        <Btn C={C} onClick={saveField}>{editing?"Update Field":"Add Field"}</Btn>
        <Btn C={C} variant="ghost" onClick={()=>{setAdding(false);setEditing(null);}}>Cancel</Btn>
      </div>
    </div>}
  </div>;
}

// ─── ADMIN SETTINGS: Email Config ────────────────────────────────────────────
function EmailConfig({ config, onSave, C }) {
  const [f,setF]=useState(config||{serviceId:"",templateId:"",publicKey:"",opsEmail:"",financeEmail:""});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return <div>
    <div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:4}}>EmailJS Configuration</div>
    <div style={{fontSize:12,color:C.textDim,marginBottom:16}}>Sign up free at <a href="https://www.emailjs.com" target="_blank" style={{color:C.teal}}>emailjs.com</a> → create a service + template → paste IDs below. The template must have params: <code>to_email</code>, <code>subject</code>, <code>html_body</code>, <code>from_name</code>.</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <FInput label="Service ID" value={f.serviceId} onChange={e=>s("serviceId",e.target.value)} C={C} placeholder="service_xxxxxxx"/>
      <FInput label="Template ID" value={f.templateId} onChange={e=>s("templateId",e.target.value)} C={C} placeholder="template_xxxxxxx"/>
      <FInput label="Public Key" value={f.publicKey} onChange={e=>s("publicKey",e.target.value)} C={C} placeholder="Your EmailJS public key"/>
      <div/>
      <FInput label="Operations Team Email" value={f.opsEmail} onChange={e=>s("opsEmail",e.target.value)} C={C} placeholder="operations@faceprep.in"/>
      <FInput label="Finance Team Email" value={f.financeEmail} onChange={e=>s("financeEmail",e.target.value)} C={C} placeholder="finance@faceprep.in"/>
    </div>
    <Btn C={C} onClick={()=>onSave(f)}>Save Email Config</Btn>
  </div>;
}

// ─── BULK UPLOAD MODAL ────────────────────────────────────────────────────────
function BulkUploadModal({ onClose, onImport, C, currentUser }) {
  const [step,setStep]=useState("choose"); // choose | preview | done
  const [parsed,setParsed]=useState([]);
  const [errors,setErrors]=useState([]);
  const fileRef=useRef(null);

  function parseCSV(text){
    const lines=text.trim().split("\n");
    const headers=lines[0].split(",").map(h=>h.replace(/"/g,"").trim());
    return lines.slice(1).map((line,i)=>{
      const vals=line.match(/(".*?"|[^,]+)/g)||[];
      const obj={};
      headers.forEach((h,j)=>{obj[h]=(vals[j]||"").replace(/"/g,"").trim();});
      return {...obj,_row:i+2};
    });
  }

  function handleFile(e){
    const file=e.target.files[0];
    if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const rows=parseCSV(ev.target.result);
        const errs=[];
        rows.forEach(r=>{if(!r.name)errs.push(`Row ${r._row}: Missing institution name`);});
        setParsed(rows);setErrors(errs);setStep("preview");
      }catch(err){alert("Could not parse CSV: "+err.message);}
    };
    reader.readAsText(file);
  }

  function doImport(){
    const institutions=parsed.filter(r=>r.name).map(r=>({
      id:`bulk_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name:r.name||"",clientCode:r.clientCode||r["Client Code"]||"",
      segment:r.segment||r["Segment"]||"",city:r.city||r["City"]||"",
      state:r.state||r["State"]||"",type:r.type||r["Type"]||"Engineering",
      address:r.address||r["Address"]||"",addedBy:currentUser.id
    }));
    onImport(institutions);setStep("done");
  }

  return <Modal title="Bulk Upload Institutions" onClose={onClose} C={C}>
    {step==="choose"&&<div>
      <div style={{fontSize:13,color:C.textDim,marginBottom:16}}>Upload a CSV with columns: <strong>name, clientCode, segment, city, state, type, address</strong></div>
      <div style={{background:C.surfaceAlt,border:`2px dashed ${C.border}`,borderRadius:12,padding:32,textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:32,marginBottom:8}}>📂</div>
        <div style={{fontSize:13,color:C.textDim,marginBottom:14}}>Drag & drop CSV or click to browse</div>
        <input type="file" accept=".csv" ref={fileRef} onChange={handleFile} style={{display:"none"}}/>
        <Btn C={C} onClick={()=>fileRef.current.click()}>Select CSV File</Btn>
      </div>
      <Btn C={C} variant="ghost" style={{fontSize:12}} onClick={()=>{
        const csv="name,clientCode,segment,city,state,type,address\nSRM Engineering College,EC10001,A+,Chennai,Tamil Nadu,Engineering,\"Main Road, Chennai\"\nVIT Vellore,EC10002,A+,Vellore,Tamil Nadu,Deemed University,\"Vellore 632014\"";
        const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="institutions_template.csv";a.click();
      }}>⬇ Download Template</Btn>
    </div>}
    {step==="preview"&&<div>
      <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:8}}>{parsed.length} rows found · {errors.length} errors</div>
      {errors.length>0&&<div style={{background:C.red+"18",border:`1px solid ${C.red}44`,borderRadius:8,padding:12,marginBottom:12}}>{errors.map((e,i)=><div key={i} style={{fontSize:12,color:C.red}}>{e}</div>)}</div>}
      <div style={{maxHeight:300,overflowY:"auto",marginBottom:16}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr>{["Name","Code","City","State","Type"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 8px",borderBottom:`1px solid ${C.border}`,color:C.textDim,fontWeight:700,textTransform:"uppercase",fontSize:10}}>{h}</th>)}</tr></thead>
          <tbody>{parsed.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${C.border}`}}>{["name","clientCode","city","state","type"].map(k=><td key={k} style={{padding:"6px 8px",color:C.text,fontSize:12}}>{r[k]||"—"}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn C={C} onClick={doImport} disabled={parsed.filter(r=>r.name).length===0}>Import {parsed.filter(r=>r.name).length} Institutions</Btn>
        <Btn C={C} variant="ghost" onClick={()=>setStep("choose")}>Back</Btn>
      </div>
    </div>}
    {step==="done"&&<div style={{textAlign:"center",padding:32}}>
      <div style={{fontSize:40,marginBottom:12}}>✅</div>
      <div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:8}}>Import Complete!</div>
      <div style={{fontSize:13,color:C.textDim,marginBottom:20}}>{parsed.filter(r=>r.name).length} institutions imported successfully.</div>
      <Btn C={C} onClick={onClose}>Close</Btn>
    </div>}
  </Modal>;
}

// ─── SETTINGS VIEW ────────────────────────────────────────────────────────────
function SettingsView({ users, fieldDefs, emailConfig, onSaveUsers, onSaveFields, onSaveEmailConfig, C }) {
  const [stab,setStab]=useState("users");
  const tabs=[["users","👥 Users"],["fields","🔧 OIF Fields"],["email","📧 Email Config"]];
  const ref=useFadeIn(0);
  return <div ref={ref}>
    <div style={{fontSize:24,fontWeight:900,color:C.text,marginBottom:20}}>Settings</div>
    <div style={{display:"flex",gap:4,marginBottom:24,background:C.surfaceAlt,padding:4,borderRadius:12,width:"fit-content"}}>
      {tabs.map(([k,l])=><button key={k} onClick={()=>setStab(k)} style={{background:stab===k?C.surface:"transparent",border:stab===k?`1px solid ${C.border}`:"none",borderRadius:8,padding:"8px 16px",fontSize:13,fontWeight:700,cursor:"pointer",color:stab===k?C.orange:C.textMid,fontFamily:"inherit",transition:"all 0.2s"}}>{l}</button>)}
    </div>
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:24}}>
      {stab==="users"&&<UsersAdmin users={users} onSave={onSaveUsers} C={C}/>}
      {stab==="fields"&&<FieldManager fieldDefs={fieldDefs} onSave={onSaveFields} C={C}/>}
      {stab==="email"&&<EmailConfig config={emailConfig} onSave={onSaveEmailConfig} C={C}/>}
    </div>
  </div>;
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, dark, setDark }) {
  const C = dark ? DARK : LIGHT;
  const [id,setId]=useState(""); const [pw,setPw]=useState(""); const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const cardRef=useFadeIn(100);

  async function handle(){
    setLoading(true);
    await new Promise(r=>setTimeout(r,400));
    const u=USERS_RUNTIME.find(u=>u.id===id&&u.password===pw);
    if(u)onLogin(u);else{setErr("Invalid credentials.");setLoading(false);}
  }

  return <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Segoe UI',Roboto,sans-serif",transition:"background 0.3s"}}>
    <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} * { box-sizing: border-box; }`}</style>
    
    <div style={{position:"absolute",top:20,right:20}}><ThemeToggle dark={dark} setDark={setDark} C={C}/></div>
    <div ref={cardRef} style={{width:420,background:C.surface,border:`1px solid ${C.border}`,borderRadius:24,padding:44,boxShadow:`0 32px 80px rgba(0,0,0,${dark?0.6:0.12}),0 0 0 1px ${C.orange}18`}}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{display:"inline-block",background:DARK.bg,borderRadius:12,padding:"12px 24px",border:`1px solid ${DARK.border}`,marginBottom:24}}>
          <img src={LOGO_SRC} alt="FACE Prep" style={{width:180,height:"auto",objectFit:"contain"}}/>
        </div>
        <div style={{fontSize:28,fontWeight:900,color:C.text,marginBottom:4}}>Sales CRM</div>
        <div style={{fontSize:13,color:C.textDim}}>Sign in to your account</div>
      </div>
      <div style={{marginBottom:14}}><label style={labelStyle(C)}>User</label>
        <select value={id} onChange={e=>setId(e.target.value)} style={{...inputStyle(C),transition:"border-color 0.2s"}} onFocus={e=>e.currentTarget.style.borderColor=C.orange} onBlur={e=>e.currentTarget.style.borderColor=C.border}>
          <option value="">Select user…</option>
          {USERS_RUNTIME.map(u=><option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
        </select>
      </div>
      <FInput label="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()} C={C}/>
      {err&&<div style={{color:C.red,fontSize:12,marginBottom:12,animation:"fadeIn 0.2s"}}>{err}</div>}
      <button onClick={handle} disabled={loading} style={{width:"100%",background:loading?C.orange+"aa":C.orange,color:"#fff",border:"none",borderRadius:10,padding:"13px 0",fontSize:15,fontWeight:800,cursor:loading?"wait":"pointer",fontFamily:"inherit",transition:"all 0.25s",transform:loading?"scale(0.98)":"scale(1)"}}
        onMouseEnter={e=>{if(!loading)e.currentTarget.style.filter="brightness(1.08)"}} onMouseLeave={e=>e.currentTarget.style.filter="none"}>
        {loading?"Signing in…":"Sign In →"}
      </button>
      <div style={{marginTop:22,fontSize:11,color:C.textDim,borderTop:`1px solid ${C.border}`,paddingTop:14,lineHeight:2}}>Admin: dinesh / admin123<br/>User 1: rep1 / rep123 · User 2: rep2 / rep456</div>
    </div>
  </div>;
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
// Runtime user list (starts from DEFAULT_USERS, merged with stored)
let USERS_RUNTIME = [...DEFAULT_USERS];

export default function App() {
  const [user,setUser]=useState(null);
  const [dark,setDark]=useState(false);
  const [tab,setTab]=useState("dashboard");
  const [institutions,setInstitutions]=useState([]);
  const [contacts,setContacts]=useState([]);
  const [deals,setDeals]=useState([]);
  const [users,setUsers]=useState(DEFAULT_USERS);
  const [fieldDefs,setFieldDefs]=useState(DEFAULT_FIELDS);
  const [emailjsConfig,setEmailjsConfig]=useState(null);
  const [loading,setLoading]=useState(true);

  const [showAddInst,setShowAddInst]=useState(false);
  const [showAddContact,setShowAddContact]=useState(null);
  const [showAddDeal,setShowAddDeal]=useState(false);
  const [showEditDeal,setShowEditDeal]=useState(null);
  const [showViewDeal,setShowViewDeal]=useState(null);
  const [showEmailPreview,setShowEmailPreview]=useState(null);
  const [showBulkUpload,setShowBulkUpload]=useState(false);

  const C=dark?DARK:LIGHT;

  useEffect(()=>{
    // Remove browser default body margin/padding (prevents white border around app)
    document.body.style.margin="0";
    document.body.style.padding="0";
    document.documentElement.style.margin="0";
    document.documentElement.style.padding="0";
    async function load(){
      const [i,c,d,u,fd,ec]=await Promise.all([
        db.get("crm_institutions"),db.get("crm_contacts"),db.get("crm_deals"),
        db.get("crm_users"),db.get("crm_field_defs"),db.get("crm_emailjs_config")
      ]);
      setInstitutions(i||[]);setContacts(c||[]);setDeals(d||[]);
      const loadedUsers=u||DEFAULT_USERS;
      setUsers(loadedUsers);USERS_RUNTIME=loadedUsers;
      if(fd)setFieldDefs(fd);
      if(ec)setEmailjsConfig(ec);
      setLoading(false);
    }
    load();
  },[]);

  const saveInst  = async d=>{setInstitutions(d);await db.set("crm_institutions",d);};
  const saveCon   = async d=>{setContacts(d);    await db.set("crm_contacts",d);    };
  const saveDeals = async d=>{setDeals(d);        await db.set("crm_deals",d);       };
  const saveUsers = async d=>{setUsers(d);USERS_RUNTIME=d;await db.set("crm_users",d);};
  const saveFields= async d=>{setFieldDefs(d);   await db.set("crm_field_defs",d);  };
  const saveEmail = async d=>{setEmailjsConfig(d);await db.set("crm_emailjs_config",d);};

  const handleApprove=async id=>{
    const upd=deals.map(d=>d.id===id?{...d,status:"Approved"}:d);
    await saveDeals(upd);
    const deal=upd.find(d=>d.id===id);
    const inst=institutions.find(i=>i.id===deal.institutionId);
    setShowEmailPreview({deal,inst});
  };
  const handleReject=async id=>{await saveDeals(deals.map(d=>d.id===id?{...d,status:"Rejected"}:d));};
  const handleSaveDeal=async(instId,f)=>{
    const nd={...f,id:Date.now().toString(),institutionId:instId,repId:user.id,repName:user.name,status:user.role===ROLES.ADMIN?"Approved":"Pending Approval",createdAt:new Date().toISOString()};
    const upd=[...deals,nd];await saveDeals(upd);setShowAddDeal(false);
    if(user.role===ROLES.ADMIN)setShowEmailPreview({deal:nd,inst:institutions.find(i=>i.id===instId)});
  };
  const handleUpdateDeal=async(instId,f)=>{
    await saveDeals(deals.map(d=>d.id===showEditDeal.id?{...d,...f,institutionId:instId}:d));
    setShowEditDeal(null);
  };
  const handleClone=async deal=>{
    const cl={...deal,id:Date.now().toString(),title:`${deal.title||deal.programName} (Copy)`,status:user.role===ROLES.ADMIN?"Approved":"Pending Approval",createdAt:new Date().toISOString(),repId:user.id,repName:user.name};
    await saveDeals([...deals,cl]);setShowViewDeal(null);alert("OIF cloned. Find it in the same institution.");
  };

  if(!user) return <LoginScreen onLogin={setUser} dark={dark} setDark={setDark}/>;
  if(loading) return <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",color:C.orange,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Segoe UI',Roboto,sans-serif",fontSize:16,fontWeight:700}}>Loading…</div>;

  const pending=deals.filter(d=>d.status==="Pending Approval");
  const tabs=[["dashboard","Dashboard"],["pipeline","Pipeline"],["institutions","Institutions"],["contacts","Contacts"],...(user.role===ROLES.ADMIN?[["approvals",`Approvals${pending.length?` (${pending.length})`:""}`],["settings","⚙ Settings"]]:[])];;

  return <div style={{minHeight:"100vh",background:C.bg,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Segoe UI',Roboto,sans-serif",color:C.text,transition:"background 0.3s,color 0.3s"}}>
    <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} * { box-sizing:border-box; }`}</style>
    

    {/* HEADER — always dark so white logo stays visible regardless of body theme */}
    <div style={{background:DARK.surface,borderBottom:`1px solid ${DARK.border}`,padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:100,boxShadow:DARK.shadow}}>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        {/* dark pill keeps logo visible on both light and dark body themes */}
        <div style={{background:DARK.bg,borderRadius:8,padding:"4px 14px",border:`1px solid ${DARK.border}`,marginRight:16,display:"flex",alignItems:"center"}}>
          <img src={LOGO_SRC} alt="FACE Prep" style={{height:28,width:"auto",objectFit:"contain"}}/>
        </div>
        {tabs.map(([key,label])=><button key={key} onClick={()=>setTab(key)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:700,color:tab===key?DARK.orange:DARK.textMid,borderBottom:tab===key?`2px solid ${DARK.orange}`:"2px solid transparent",padding:"4px 2px",marginRight:18,fontFamily:"inherit",transition:"color 0.2s"}}>{label}</button>)}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {user.role===ROLES.ADMIN&&<Btn C={DARK} variant="ghost" style={{fontSize:12,padding:"5px 12px"}} onClick={()=>setShowBulkUpload(true)}>📂 Bulk Upload</Btn>}
        <ThemeToggle dark={dark} setDark={setDark} C={DARK}/>
        <span style={{fontSize:12,color:DARK.textDim}}>{user.name}</span>
        <Badge text={user.role==="user"?"User":user.role==="admin"?"Admin":user.role} color={user.role===ROLES.ADMIN?DARK.orange:DARK.teal}/>
        <Btn C={DARK} variant="ghost" onClick={()=>setUser(null)} style={{padding:"4px 10px",fontSize:12}}>Sign out</Btn>
      </div>
    </div>

    <div style={{padding:"28px",maxWidth:1400,margin:"0 auto"}}>
      {tab==="dashboard"&&<DashboardView deals={deals} institutions={institutions} contacts={contacts} users={users} C={C}/>}
      {tab==="pipeline"&&<PipelineView deals={deals} institutions={institutions} user={user} onAddDeal={()=>setShowAddDeal(true)} onViewDeal={d=>setShowViewDeal(d)} C={C}/>}
      {tab==="institutions"&&<InstitutionsView institutions={institutions} contacts={contacts} deals={deals} user={user} onAddInst={()=>setShowAddInst(true)} onAddContact={id=>setShowAddContact(id)} onAddDeal={id=>setShowAddDeal(id)} onViewDeal={d=>setShowViewDeal(d)} C={C}/>}
      {tab==="contacts"&&<ContactsView contacts={contacts} institutions={institutions} onAddContact={id=>setShowAddContact(id)} onDeleteContact={id=>saveCon(contacts.filter(c=>c.id!==id))} C={C}/>}
      {tab==="approvals"&&user.role===ROLES.ADMIN&&<ApprovalsView deals={deals} institutions={institutions} onApprove={handleApprove} onReject={handleReject} onViewDeal={d=>setShowViewDeal(d)} C={C}/>}
      {tab==="settings"&&user.role===ROLES.ADMIN&&<SettingsView users={users} fieldDefs={fieldDefs} emailConfig={emailjsConfig} onSaveUsers={saveUsers} onSaveFields={saveFields} onSaveEmailConfig={saveEmail} C={C}/>}
    </div>

    {showAddInst&&<AddInstModal C={C} onClose={()=>setShowAddInst(false)} onSave={async inst=>{await saveInst([...institutions,{...inst,id:Date.now().toString()}]);setShowAddInst(false);}}/>}
    {showAddContact&&<AddContactModal C={C} onClose={()=>setShowAddContact(null)} onSave={async ct=>{await saveCon([...contacts,{...ct,id:Date.now().toString(),institutionId:showAddContact}]);setShowAddContact(null);}}/>}
    {showAddDeal&&<AddDealModal institutions={institutions} contacts={contacts} user={user} C={C} fieldDefs={fieldDefs} initialInstId={showAddDeal===true?"":showAddDeal} onClose={()=>setShowAddDeal(false)} onSave={handleSaveDeal}/>}
    {showEditDeal&&<AddDealModal institutions={institutions} contacts={contacts} user={user} C={C} fieldDefs={fieldDefs} initialInstId={showEditDeal.institutionId} initial={showEditDeal} onClose={()=>setShowEditDeal(null)} onSave={handleUpdateDeal}/>}
    {showViewDeal&&<ViewDealModal deal={showViewDeal} inst={institutions.find(i=>i.id===showViewDeal.institutionId)} contacts={contacts} user={user} deals={deals} C={C} fieldDefs={fieldDefs} onClose={()=>setShowViewDeal(null)} onSaveDeals={saveDeals} onEdit={()=>{setShowEditDeal(showViewDeal);setShowViewDeal(null);}} onClone={()=>handleClone(showViewDeal)} onEmailPreview={()=>{const inst=institutions.find(i=>i.id===showViewDeal.institutionId);setShowViewDeal(null);setShowEmailPreview({deal:showViewDeal,inst});}}/>}
    {showEmailPreview&&<EmailPreviewModal deal={showEmailPreview.deal} inst={showEmailPreview.inst} C={C} emailjsConfig={emailjsConfig} onClose={()=>setShowEmailPreview(null)}/>}
    {showBulkUpload&&<BulkUploadModal C={C} currentUser={user} onClose={()=>setShowBulkUpload(false)} onImport={async rows=>{const upd=[...institutions,...rows];await saveInst(upd);setShowBulkUpload(false);}}/>}
  </div>;
}
