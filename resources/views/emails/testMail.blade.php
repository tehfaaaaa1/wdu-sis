<!DOCTYPE html>
<html>

<head>
    <title>Welcome Email</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:20px;">
                    <tr>
                        <td style="text-align: center;">
                            {{-- {{ $message->embed(mailData['logo']) }} --}}
                            <img src="{{ asset('img\wdu-ijo.png') }}" alt="Wahana Data Utama" width="400">
                            <h1 style="color:#333333; font-family: Arial, sans-serif;">Anda diundang untuk mengisi formulir kami!</h1>
                            <p style="color:#666666; font-family: Arial, sans-serif; font-size:16px;">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores sequi, dolor totam repellendus recusandae velit hic laudantium eligendi exercitationem doloremque voluptatem excepturi enim dolores voluptate est accusantium suscipit quasi itaque!
                            </p>
                            <a href="#"
                                style="font-family: Arial, Helvetica, sans-serif; background-color:#28a745; color:#ffffff; padding:10px 20px; text-decoration:none; display:inline-block; border-radius:5px;">
                                Get Started
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
