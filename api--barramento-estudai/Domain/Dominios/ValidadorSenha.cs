using System.Security.Cryptography;

namespace api__barramento_estudai.Domain.Dominios
{
    public static class ValidadorSenha
    {
        public static bool VerificarSenha(string senhaDigitada, string senhaHashArmazenada)
        {
            var partes = senhaHashArmazenada.Split(':');
            if (partes.Length != 2)
                return false;

            var salt = Convert.FromBase64String(partes[0]);
            var hashArmazenado = Convert.FromBase64String(partes[1]);

            var hashGerado = new Rfc2898DeriveBytes(
                senhaDigitada,
                salt,
                100_000,
                HashAlgorithmName.SHA256
            ).GetBytes(32);

            return hashArmazenado.SequenceEqual(hashGerado);
        }
    }
}
