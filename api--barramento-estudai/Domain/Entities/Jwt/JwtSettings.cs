namespace api__barramento_estudai.Domain.Entities.Jwt
{
    public class JwtSettings
    {
        public string SecretKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int ExpiryHours { get; set; }
    }
}
