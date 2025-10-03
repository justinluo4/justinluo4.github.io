uniform float iTime;
uniform vec2 iResolution;
uniform float iScroll;
uniform vec2 iMouse;
uniform float iPersonalWebsiteHover;

float opSmoothUnion( float d1, float d2, float k )
{
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

float sdSphere( vec3 p, float s )
{
  return length(p)-s;
} 
float sdBox( vec3 p, vec3 b )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}
float map1(vec3 p)
{
	float d = 2.0;
	for (int i = 0; i < 16; i++) {
		float fi = float(i);
		float time = iTime * (fract(fi * 412.531 + 0.513) - 0.5) * 2.0;
		d = opSmoothUnion(
            sdSphere(p + sin(time + fi * vec3(52.5126, 64.62744, 632.25)) * vec3(2.0, 2.0, 0.8), mix(0.5, 1.0, fract(fi * 412.531 + 0.5124))),
			d,
			0.4
		);
	}
	return d;
}
float map2(vec3 p)
{
	float d = 2.0;
	for (int i = 0; i < 16; i++) {
		float fi = float(i);
		float time = iTime * (fract(fi * 412.531 + 0.513) - 0.5) * 2.0;
		d = opSmoothUnion(
            sdBox(p + sin(time + fi * vec3(52.5126, 64.62744, 632.25)) * vec3(2.0, 2.0, 0.8), vec3(mix(0.5, 1.0, fract(fi * 412.531 + 0.5124)))),
			d,
			0.4
		);
	}
	return d;
}

float map(vec3 p){
    float alpha= iPersonalWebsiteHover;
    return mix(map1(p), map2(p), alpha);
    
}
vec3 calcNormal( in vec3 p )
{
    const float h = 1e-5; // or some other value
    const vec2 k = vec2(1,-1);
    return normalize( k.xyy*map( p + k.xyy*h ) + 
                      k.yyx*map( p + k.yyx*h ) + 
                      k.yxy*map( p + k.yxy*h ) + 
                      k.xxx*map( p + k.xxx*h ) );
}


// https://iquilezles.org/articles/nvscene2008/rwwtt.pdf
float calcAO( in vec3 pos, in vec3 nor )
{
	float occ = 0.0;
    float sca = 1.0;
    for( int i=0; i<5; i++ )
    {
        float h = 0.01 + 0.12*float(i)/4.0;
        float d = map( pos + h*nor );
        occ += (h-d)*sca;
        sca *= 0.95;
        if( occ>0.35 ) break;
    }
    return clamp( 1.0 - 3.0*occ, 0.0, 1.0 ) ;
}


void main()
{
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    float theta = iScroll/500.0 - 1.6;
    float c = cos(theta);
    float s = sin(theta);
    float d = 12.0;
    vec3 camPos = vec3(c, 0.0, s) * d;
    vec3 rayDir = normalize(vec3((uv*2.0 - 1.0) * vec2(iResolution.x/iResolution.y, 1), 3));
    mat2 rot = mat2(-s, c, -c, -s);
    rayDir.xz = rot * rayDir.xz;
    vec3 lightDir = normalize(vec3(3.0, -10.0, 3.0));
	float depth = 0.0;
	vec3 p;
	bool hit = false;
	for(int i = 0; i < 128; i++) {
		p = camPos + rayDir * depth;
		float dist = map(p);
        depth += dist;
		if (dist < 1e-3) {
            hit = true;
			break;
            
		}
	}
	
    if(!hit){
        gl_FragColor = vec4(0.0);
        return;
    }
	vec3 n = calcNormal(p);
    float occ = calcAO(p, n);
    float b = 0.0;
    b += max(0.0, dot(n, -lightDir)/2.0);
    if( hit){
        vec3 contactPoint = p;
        float d2 = 0.000001;
        float shadow = 1.0;
        for(int i = 0; i < 64; i++) {
            p = contactPoint - lightDir * d2;
            float dist = map(p);

            shadow = min(shadow, dist/d2 * 8.0);
            d2 += clamp( dist, 0.01, 0.2 );
            if (shadow < 0.004 || d2 > 10.0) {
                break;

            }
        }
        shadow = max(0.2, shadow);
        b *= occ;
        b *= shadow;
    }
    b += 0.05;
    vec3 col = vec3(pow(b, 0.6));
    //col *= exp( -depth * 0.15 );
    
	
    // maximum thickness is 2m in alpha channel
    gl_FragColor = vec4(col, hit ? 1.0 : 0.0);
}