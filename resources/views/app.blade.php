<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>OKR Project</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/main.jsx'])
</head>
<body class="min-h-screen bg-body-bg text-body-color">
    <div id="app"></div>

    <script>
        (function(){
            const u = @json(auth()->user());
            if (u) {
                window.__USER__ = {
                    name: u.full_name || u.name || null,
                    email: u.email || null,
                    avatar: u.avatar_url || null,
                };
            } else {
                window.__USER__ = null;
            }
        })();
    </script>
</body>
</html>


